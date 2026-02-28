import { NextResponse } from "next/server";
import type { CapsuleType } from "@/types/capsule";
import { createCapsule, listCapsulesBySlug } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    agentSlug?: string;
    ownerAddress?: string;
    capsuleType?: CapsuleType;
    result?: string;
    proofHash?: string;
    createdAt?: string;
  };

  if (!body.agentSlug || !body.ownerAddress || !body.capsuleType || !body.result || !body.proofHash || !body.createdAt) {
    return NextResponse.json({ message: "missing fields" }, { status: 400 });
  }

  const capsule = await createCapsule({
    agentSlug: body.agentSlug,
    ownerAddress: body.ownerAddress,
    capsuleType: body.capsuleType,
    result: body.result,
    proofHash: body.proofHash,
    createdAt: body.createdAt,
  });

  return NextResponse.json({ capsule });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";
  if (!slug) {
    return NextResponse.json({ capsules: [] });
  }
  return NextResponse.json({ capsules: await listCapsulesBySlug(slug) });
}
