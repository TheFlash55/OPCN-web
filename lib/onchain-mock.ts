import { redis } from "@/lib/redis";
import { sha256Hex } from "@/lib/hash";
import type { Capsule } from "@/types/capsule";
import type { OnchainBinding, OnchainCredential } from "@/types/onchain";

type OnchainDB = {
  bindings: OnchainBinding[];
  credentials: OnchainCredential[];
  capsules: Capsule[];
};

const ONCHAIN_KEY = "opcn:onchain:v1";

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function txHashMock() {
  const body = Math.random().toString(16).slice(2).padEnd(64, "0").slice(0, 64);
  return `0x${body}`;
}

function seedOnchain(): OnchainDB {
  return { bindings: [], credentials: [], capsules: [] };
}

async function readOnchain() {
  const existing = await redis.get<OnchainDB>(ONCHAIN_KEY);
  if (existing) return existing;

  const seeded = seedOnchain();
  await redis.set(ONCHAIN_KEY, seeded);
  return seeded;
}

async function writeOnchain(data: OnchainDB) {
  await redis.set(ONCHAIN_KEY, data);
}

export async function resetOnchainDb() {
  const seeded = seedOnchain();
  await writeOnchain(seeded);
  return seeded;
}

export async function saveBinding(input: Omit<OnchainBinding, "id">) {
  const row: OnchainBinding = { ...input, id: uid("bind") };
  const store = await readOnchain();
  const idx = store.bindings.findIndex(
    (b) => b.agentSlug === row.agentSlug && b.address.toLowerCase() === row.address.toLowerCase()
  );
  if (idx >= 0) {
    store.bindings[idx] = { ...row, id: store.bindings[idx].id };
    await writeOnchain(store);
    return store.bindings[idx];
  }
  store.bindings.unshift(row);
  await writeOnchain(store);
  return row;
}

export async function listBindingsByAddress(address: string) {
  const store = await readOnchain();
  return store.bindings.filter((b) => b.address.toLowerCase() === address.toLowerCase());
}

export async function getBindingByAgent(slug: string) {
  const store = await readOnchain();
  return store.bindings.find((b) => b.agentSlug === slug) || null;
}

export async function mintCredential(address: string) {
  const store = await readOnchain();
  const existed = store.credentials.find((c) => c.address.toLowerCase() === address.toLowerCase());
  if (existed) return existed;

  const row: OnchainCredential = {
    address,
    tokenId: `${Math.floor(100000 + Math.random() * 899999)}`,
    mintedAt: new Date().toISOString(),
    status: "minted",
  };
  store.credentials.unshift(row);
  await writeOnchain(store);
  return row;
}

export async function getCredentialByAddress(address: string) {
  const store = await readOnchain();
  return store.credentials.find((c) => c.address.toLowerCase() === address.toLowerCase()) || null;
}

export async function createCapsule(input: Omit<Capsule, "id" | "txHash" | "verifyStatus">) {
  const row: Capsule = {
    ...input,
    id: uid("capsule"),
    txHash: txHashMock(),
    verifyStatus: "unverified",
  };
  const store = await readOnchain();
  store.capsules.unshift(row);
  await writeOnchain(store);
  return row;
}

export async function listCapsulesBySlug(slug: string) {
  const store = await readOnchain();
  return store.capsules.filter((c) => c.agentSlug === slug);
}

export async function verifyCapsule(input: { id: string; claimHash: string }) {
  const store = await readOnchain();
  const row = store.capsules.find((c) => c.id === input.id);
  if (!row) return { ok: false as const, reason: "not_found" };

  const recomputed = await sha256Hex(`${row.result}|${input.claimHash}|${row.createdAt}`);
  const ok = recomputed.toLowerCase() === row.proofHash.toLowerCase();
  row.verifyStatus = ok ? "ok" : "failed";
  await writeOnchain(store);
  return { ok, capsule: row };
}

