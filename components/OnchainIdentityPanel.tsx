"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, ShieldCheck } from "lucide-react";
import { verifyMessage } from "viem";
import { useAccount, useChainId, useConnect, useSignMessage } from "wagmi";
import { appChain } from "@/lib/chain/config";
import { sha256Hex } from "@/lib/hash";
import { track } from "@/lib/track";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OnchainBinding, OnchainCredential } from "@/types/onchain";
import { useOnchainStore } from "@/store/onchain";
import { useAcquisitionStore } from "@/store/acquisition";
import { useOnboardingStore } from "@/store/onboarding";

type PanelAgentInput = {
  agentSlug?: string;
  displayName?: string;
  headline?: string;
  tags?: string[];
  offers?: unknown[];
  deliveryNote?: string;
};

type Props = {
  agent?: PanelAgentInput;
};

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function OnchainIdentityPanel({ agent }: Props) {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  const { signMessageAsync } = useSignMessage();

  const onboardingDraft = useOnboardingStore((s) => s.draft);
  const publishedSlug = useAcquisitionStore((s) => s.publishedSlug);

  const upsertBinding = useOnchainStore((s) => s.upsertBinding);
  const upsertCredential = useOnchainStore((s) => s.upsertCredential);
  const bindings = useOnchainStore((s) => s.bindings);
  const credentials = useOnchainStore((s) => s.credentials);

  const [claimJson, setClaimJson] = useState("");
  const [claimHash, setClaimHash] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [signedAt, setSignedAt] = useState<string>("");
  const [verifyOk, setVerifyOk] = useState<boolean | null>(null);
  const [minting, setMinting] = useState(false);
  const quickConnectors = useMemo(() => {
    const injected = connectors.find((c) => c.type === "injected");
    const wc = connectors.find((c) => c.type === "walletConnect");
    return [injected, wc].filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [connectors]);

  const agentSlug = agent?.agentSlug || onboardingDraft.slug || publishedSlug || "agent-draft";

  const snapshot = useMemo(() => {
    return {
      displayName: agent?.displayName || onboardingDraft.displayName || "",
      headline: agent?.headline || onboardingDraft.headline || "",
      tags: agent?.tags || onboardingDraft.tags || [],
      offers: agent?.offers || onboardingDraft.offers || [],
      deliveryNotes: agent?.deliveryNote || onboardingDraft.deliveryNote || "",
      agentSlug,
      createdAt: new Date().toISOString(),
    };
  }, [agent?.deliveryNote, agent?.displayName, agent?.headline, agent?.offers, agent?.tags, agentSlug, onboardingDraft.displayName, onboardingDraft.headline, onboardingDraft.offers, onboardingDraft.tags, onboardingDraft.deliveryNote]);

  const existingBinding: OnchainBinding | undefined = useMemo(() => {
    if (!agentSlug) return undefined;
    return bindings.find((b) => b.agentSlug === agentSlug && (!address || b.address.toLowerCase() === address.toLowerCase()));
  }, [bindings, agentSlug, address]);

  const existingCredential: OnchainCredential | undefined = useMemo(() => {
    if (!address) return undefined;
    return credentials.find((c) => c.address.toLowerCase() === address.toLowerCase());
  }, [credentials, address]);

  useEffect(() => {
    if (existingBinding) {
      setClaimHash(existingBinding.claimHash);
      setSignature(existingBinding.signature);
      setSignedAt(existingBinding.createdAt);
    }
  }, [existingBinding]);

  useEffect(() => {
    if (!address) return;
    fetch(`/api/onchain/bindings?address=${address}`)
      .then((r) => r.json())
      .then((d: { bindings?: OnchainBinding[] }) => {
        (d.bindings || []).forEach((b) => upsertBinding(b));
      })
      .catch(() => {
        // noop
      });

    fetch(`/api/onchain/mint-credential?address=${address}`)
      .then((r) => r.json())
      .then((d: { credential?: OnchainCredential | null }) => {
        if (d.credential) upsertCredential(d.credential);
      })
      .catch(() => {
        // noop
      });
  }, [address, upsertBinding, upsertCredential]);

  const generateClaim = async () => {
    const json = JSON.stringify(snapshot, null, 2);
    const hash = await sha256Hex(json);
    setClaimJson(json);
    setClaimHash(hash);
  };

  const signBind = async () => {
    if (!isConnected || !address) {
      toast("Please connect wallet first");
      return;
    }
    if (!claimHash) {
      toast("Generate claim hash first");
      return;
    }

    const timestamp = new Date().toISOString();
    const message = `OPCN Bind: ${agentSlug} | ${claimHash} | ${timestamp}`;

    const sig = await signMessageAsync({ message });
    setSignature(sig);
    setSignedAt(timestamp);

    const valid = await verifyMessage({ address: address as `0x${string}`, message, signature: sig });
    setVerifyOk(valid);

    const status = valid ? "verified" : "bound";
    const binding = {
      id: `${agentSlug}-${address}`,
      address,
      chainId,
      agentSlug,
      claimHash,
      signature: sig,
      createdAt: timestamp,
      status,
    } as const;

    upsertBinding(binding);

    await fetch("/api/onchain/bind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(binding),
    });

    track("onchain_bound", { address, agentSlug, chainId, status });
    toast("Binding saved");
  };

  const verifySignature = async () => {
    if (!address || !claimHash || !signature || !signedAt) {
      toast("Missing binding data");
      return;
    }
    const message = `OPCN Bind: ${agentSlug} | ${claimHash} | ${signedAt}`;
    const ok = await verifyMessage({ address: address as `0x${string}`, message, signature: signature as `0x${string}` });
    setVerifyOk(ok);
    toast(ok ? "Signature verified" : "Signature verification failed");
  };

  const mintCredential = async () => {
    if (!address) {
      toast("Connect wallet first");
      return;
    }
    setMinting(true);
    try {
      const res = await fetch("/api/onchain/mint-credential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const data = (await res.json()) as { tokenId: string; credential: { address: string; tokenId: string; mintedAt: string; status: "minted" } };
      upsertCredential(data.credential);
      track("credential_minted", { address, tokenId: data.tokenId });
      toast(`Credential minted #${data.tokenId}`);
    } finally {
      setMinting(false);
    }
  };

  const did = address ? `did:opcn:eip155:${chainId}:${address}#${agentSlug}` : "-";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onchain Identity Mapping</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <p className="mb-2 text-sm font-medium">Step 1. Connect Wallet</p>
          {isConnected && address ? (
            <p className="text-sm text-muted-foreground">{shortAddress(address)} · chain {chainId} (target {appChain.id})</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {quickConnectors.map((c) => (
                <Button key={c.uid} size="sm" variant="outline" className="h-8 px-2.5 text-xs" onClick={() => { connect({ connector: c }); track("wallet_connected", { connector: c.name }); }}>
                  {c.type === "injected" ? "Injected" : "WalletConnect"}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border p-4">
          <p className="mb-2 text-sm font-medium">Step 2. Generate Offchain Claim</p>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={generateClaim}>Generate claimHash</Button>
            {claimHash && (
              <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(claimHash)}>
                <Copy className="mr-1 h-4 w-4" />Copy Hash
              </Button>
            )}
          </div>
          {claimHash && <p className="mt-2 break-all text-xs text-muted-foreground">{claimHash}</p>}
          {claimJson && <pre className="mt-2 max-h-40 overflow-auto rounded bg-muted/40 p-2 text-xs text-muted-foreground">{claimJson}</pre>}
        </div>

        <div className="rounded-lg border border-border p-4">
          <p className="mb-2 text-sm font-medium">Step 3. Sign to Bind</p>
          <Button size="sm" onClick={signBind} disabled={!isConnected || !claimHash}>Sign Bind</Button>
          {signature && <p className="mt-2 break-all text-xs text-muted-foreground">{signature}</p>}
        </div>

        <div className="rounded-lg border border-border p-4">
          <p className="mb-2 text-sm font-medium">Step 4. Bound Status</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>DID: <span className="break-all">{did}</span></p>
            <p>Status: {existingBinding?.status || "unbound"}</p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={verifySignature} disabled={!signature}>Verify Signature</Button>
            {verifyOk !== null && (
              <span className="inline-flex items-center gap-1 text-xs">
                <ShieldCheck className="h-4 w-4" />
                {verifyOk ? "Verified" : "Failed"}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border p-4">
          <p className="mb-2 text-sm font-medium">Asset: OPC Credential</p>
          {existingCredential ? (
            <p className="text-sm text-muted-foreground">Minted #{existingCredential.tokenId} at {new Date(existingCredential.mintedAt).toLocaleString()}</p>
          ) : (
            <Button size="sm" onClick={mintCredential} disabled={!isConnected || minting}>{minting ? "Minting..." : "Mint (Mock)"}</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
