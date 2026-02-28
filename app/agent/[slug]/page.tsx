"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { track } from "@/lib/track";
import { sha256Hex } from "@/lib/hash";
import type { Agent } from "@/types";
import type { Capsule, CapsuleType } from "@/types/capsule";
import type { OnchainBinding } from "@/types/onchain";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { OnchainIdentityPanel } from "@/components/OnchainIdentityPanel";
import { useAcquisitionStore } from "@/store/acquisition";

type LeadForm = { name: string; contact: string; budgetRange: string; urgency: string; desc: string; };
const initialForm: LeadForm = { name: "", contact: "", budgetRange: "3k-10k", urgency: "normal", desc: "" };

type CapsuleDraft = {
  capsuleType: CapsuleType;
  result: string;
  createdAt: string;
  proofHash: string;
};

export default function AgentPublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [binding, setBinding] = useState<OnchainBinding | null>(null);
  const [credentialTokenId, setCredentialTokenId] = useState<string | null>(null);
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [capsuleDraft, setCapsuleDraft] = useState<CapsuleDraft>({ capsuleType: "OfferProof", result: "", createdAt: "", proofHash: "" });
  const [publishingCapsule, setPublishingCapsule] = useState(false);

  const setLeadCount = useAcquisitionStore((s) => s.setLeadCount);

  const avatarText = useMemo(() => (agent?.displayName?.[0] || "A").toUpperCase(), [agent]);
  const onchainVerified = Boolean(binding && binding.status === "verified");

  const loadCapsules = async (targetSlug: string) => {
    const res = await fetch(`/api/capsules?slug=${targetSlug}`);
    const data = (await res.json()) as { capsules?: Capsule[] };
    setCapsules(data.capsules || []);
  };

  useEffect(() => {
    if (!slug) return;
    track("agent_view", { slug });

    Promise.all([
      fetch(`/api/agents/${slug}`).then((r) => r.json()),
      fetch(`/api/onchain/bindings/by-agent?slug=${slug}`).then((r) => r.json()),
      fetch(`/api/capsules?slug=${slug}`).then((r) => r.json()),
    ])
      .then(async ([agentData, bindingData, capsuleData]) => {
        const nextAgent = (agentData as { agent?: Agent }).agent || null;
        setAgent(nextAgent);
        const nextBinding = (bindingData as { binding?: OnchainBinding | null }).binding || null;
        setBinding(nextBinding);
        setCapsules((capsuleData as { capsules?: Capsule[] }).capsules || []);

        if (nextBinding?.address) {
          const credRes = await fetch(`/api/onchain/mint-credential?address=${nextBinding.address}`);
          const credData = (await credRes.json()) as { credential?: { tokenId?: string } | null };
          setCredentialTokenId(credData.credential?.tokenId || null);
        } else {
          setCredentialTokenId(null);
        }

        const token = window.localStorage.getItem("opcn-token");
        if (token && nextAgent) {
          const meRes = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
          if (meRes.ok) {
            const me = (await meRes.json()) as { id: string };
            setIsOwner(me.id === nextAgent.ownerId);
          }
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const submitLead = async () => {
    if (!agent) return;
    if (!form.name || !form.contact) {
      toast("请填写姓名和联系方式");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentSlug: agent.slug, name: form.name, contact: form.contact, budgetRange: form.budgetRange, urgency: form.urgency, desc: form.desc }),
      });
      if (!res.ok) {
        toast("提交失败");
        return;
      }
      const countRes = await fetch("/api/leads/count");
      const countData = (await countRes.json()) as { count?: number };
      if (typeof countData.count === "number") setLeadCount(countData.count);
      window.dispatchEvent(new Event("lead:created"));
      toast("提交成功");
      setForm(initialForm);
    } finally {
      setSubmitting(false);
    }
  };

  const generateCapsuleProofHash = async () => {
    if (!capsuleDraft.result.trim()) {
      toast("请输入 result");
      return;
    }
    const createdAt = new Date().toISOString();
    const claimHash = binding?.claimHash || "";
    const proofHash = await sha256Hex(`${capsuleDraft.result}|${claimHash}|${createdAt}`);
    setCapsuleDraft((s) => ({ ...s, createdAt, proofHash }));
  };

  const publishCapsule = async () => {
    if (!agent || !binding?.address || !capsuleDraft.proofHash || !capsuleDraft.createdAt) {
      toast("请先生成 proofHash，并完成 onchain 绑定");
      return;
    }

    setPublishingCapsule(true);
    try {
      const res = await fetch("/api/capsules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentSlug: agent.slug,
          ownerAddress: binding.address,
          capsuleType: capsuleDraft.capsuleType,
          result: capsuleDraft.result,
          proofHash: capsuleDraft.proofHash,
          createdAt: capsuleDraft.createdAt,
        }),
      });
      const data = (await res.json()) as { capsule?: Capsule };
      if (!res.ok || !data.capsule) {
        toast("发布失败");
        return;
      }

      track("capsule_published", { agentSlug: agent.slug, capsuleId: data.capsule.id, capsuleType: data.capsule.capsuleType });
      toast("Capsule 已发布");
      setCapsuleDraft({ capsuleType: "OfferProof", result: "", createdAt: "", proofHash: "" });
      await loadCapsules(agent.slug);
    } finally {
      setPublishingCapsule(false);
    }
  };

  const verifyCapsule = async (id: string) => {
    if (!agent) return;
    const res = await fetch("/api/capsules/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, agentSlug: agent.slug }),
    });
    const data = (await res.json()) as { ok?: boolean; capsule?: Capsule; reason?: string };
    if (data.capsule) {
      setCapsules((prev) => prev.map((c) => (c.id === data.capsule!.id ? data.capsule! : c)));
    }
    track("capsule_verified", { id, ok: Boolean(data.ok), reason: data.reason || null });
    toast(data.ok ? "验证通过" : "验证失败");
  };

  if (loading) return <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading...</CardContent></Card>;
  if (!agent) return <Card><CardContent className="p-6 text-sm text-muted-foreground">Agent not found.</CardContent></Card>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-xl font-semibold">{avatarText}</div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {agent.displayName}
                {onchainVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" /> Onchain Verified
                  </span>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{agent.headline}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">{agent.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs">{tag}</span>)}</div>
          <p className="text-sm text-muted-foreground">⭐ {agent.rating} · calls {agent.calls}</p>
          {binding && (
            <div className="rounded-md border border-border p-2 text-xs text-muted-foreground">
              DID: <span className="break-all">did:opcn:eip155:{binding.chainId}:{binding.address}#{binding.agentSlug}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">Credential: {credentialTokenId ? `OPC #${credentialTokenId}` : "未领取"}</p>

          <Dialog>
            <DialogTrigger asChild><Button>提交需求 / 预约</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>提交线索</DialogTitle>
                <DialogDescription>填写需求信息后，Agent 所有者会联系你。</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
                <Input placeholder="contact（微信/手机号/telegram）" value={form.contact} onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))} />
                <Input placeholder="budgetRange" value={form.budgetRange} onChange={(e) => setForm((s) => ({ ...s, budgetRange: e.target.value }))} />
                <select className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={form.urgency} onChange={(e) => setForm((s) => ({ ...s, urgency: e.target.value }))}>
                  <option value="low">low</option><option value="normal">normal</option><option value="high">high</option>
                </select>
                <textarea className="w-full rounded-md border border-input bg-transparent p-3 text-sm" rows={4} value={form.desc} onChange={(e) => setForm((s) => ({ ...s, desc: e.target.value }))} placeholder="需求描述" />
                <Button onClick={submitLead} disabled={submitting}>{submitting ? "提交中..." : "确认提交"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {agent.offers.map((offer) => (
          <Card key={offer.tier}>
            <CardHeader><CardTitle className="uppercase">{offer.tier}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-semibold">¥{offer.price}</p>
              <p className="text-sm text-muted-foreground">{offer.durationDays} 天交付</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Proof Capsules</CardTitle>
          {isOwner && (
            <Dialog>
              <DialogTrigger asChild><Button size="sm">发布 Proof Capsule</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Publish Proof Capsule</DialogTitle>
                  <DialogDescription>生成 proofHash 后发布到 mock 链上记录。</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <select
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                    value={capsuleDraft.capsuleType}
                    onChange={(e) => setCapsuleDraft((s) => ({ ...s, capsuleType: e.target.value as CapsuleType }))}
                  >
                    <option value="OfferProof">OfferProof</option>
                    <option value="DeliveryProof">DeliveryProof</option>
                    <option value="IdentityProof">IdentityProof</option>
                  </select>
                  <textarea
                    className="w-full rounded-md border border-input bg-transparent p-3 text-sm"
                    rows={4}
                    value={capsuleDraft.result}
                    onChange={(e) => setCapsuleDraft((s) => ({ ...s, result: e.target.value }))}
                    placeholder="result"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={generateCapsuleProofHash}>生成 proofHash</Button>
                    <Button onClick={publishCapsule} disabled={publishingCapsule}>{publishingCapsule ? "发布中..." : "Publish (mock)"}</Button>
                  </div>
                  {capsuleDraft.proofHash && <p className="break-all text-xs text-muted-foreground">{capsuleDraft.proofHash}</p>}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {capsules.map((c) => (
            <div key={c.id} className="rounded-lg border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{c.capsuleType}</p>
                <p className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{c.result}</p>
              <p className="mt-1 break-all text-xs text-muted-foreground">proof: {c.proofHash}</p>
              <p className="text-xs text-muted-foreground">tx: {c.txHash || "-"}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => verifyCapsule(c.id)}>Verify</Button>
                <span className="text-xs text-muted-foreground">status: {c.verifyStatus}</span>
              </div>
            </div>
          ))}
          {capsules.length === 0 && <p className="text-sm text-muted-foreground">暂无 capsules。</p>}
        </CardContent>
      </Card>

      {isOwner && (
        <OnchainIdentityPanel
          agent={{
            agentSlug: agent.slug,
            displayName: agent.displayName,
            headline: agent.headline,
            tags: agent.tags,
            offers: agent.offers,
            deliveryNote: agent.deliveryNote,
          }}
        />
      )}
    </div>
  );
}
