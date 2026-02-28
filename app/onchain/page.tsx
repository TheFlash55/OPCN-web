"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import type { Capsule } from "@/types/capsule";
import type { OnchainBinding } from "@/types/onchain";
import { useOnchainStore } from "@/store/onchain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnchainIdentityPanel } from "@/components/OnchainIdentityPanel";

export default function OnchainPage() {
  const { address, isConnected } = useAccount();
  const [slug, setSlug] = useState<string | undefined>(undefined);

  const credentials = useOnchainStore((s) => s.credentials);
  const [bindings, setBindings] = useState<OnchainBinding[]>([]);
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  useEffect(() => {
    const current = new URLSearchParams(window.location.search).get("slug") || undefined;
    setSlug(current);
  }, []);

  useEffect(() => {
    if (!address) return;
    fetch(`/api/onchain/bindings?address=${address}`)
      .then((r) => r.json())
      .then((d: { bindings?: OnchainBinding[] }) => setBindings(d.bindings || []));
  }, [address]);

  useEffect(() => {
    const targetSlug = slug || bindings[0]?.agentSlug;
    if (!targetSlug) return;
    fetch(`/api/capsules?slug=${targetSlug}`)
      .then((r) => r.json())
      .then((d: { capsules?: Capsule[] }) => setCapsules(d.capsules || []));
  }, [slug, bindings]);

  const credential = useMemo(() => {
    if (!address) return undefined;
    return credentials.find((c) => c.address.toLowerCase() === address.toLowerCase());
  }, [credentials, address]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Onchain Identity Console</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Map offchain OPC Agent identity to onchain DID, credential and verifiable proof records.
        </CardContent>
      </Card>

      <OnchainIdentityPanel agent={{ agentSlug: slug }} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Onchain Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>OPC Credential: {credential ? `已领取 #${credential.tokenId}` : "未领取"}</p>
            <p>MintedAt: {credential ? new Date(credential.mintedAt).toLocaleString() : "-"}</p>
            <p>Agent Capsules: {capsules.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bindings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            {!isConnected && <p className="text-muted-foreground">请先连接钱包</p>}
            {bindings.map((b) => (
              <div key={b.id} className="rounded-md border border-border p-2">
                <p>agent: {b.agentSlug}</p>
                <p>status: {b.status}</p>
                <p className="break-all">did:opcn:eip155:{b.chainId}:{b.address}#{b.agentSlug}</p>
              </div>
            ))}
            {isConnected && bindings.length === 0 && <p className="text-muted-foreground">暂无绑定记录</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
