"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { track } from "@/lib/track";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Agent } from "@/types";
import { useAcquisitionStore } from "@/store/acquisition";

type LeadForm = { name: string; contact: string; budgetRange: string; urgency: string; desc: string; };
const initialForm: LeadForm = { name: "", contact: "", budgetRange: "3k-10k", urgency: "normal", desc: "" };

export default function AgentPublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const setLeadCount = useAcquisitionStore((s) => s.setLeadCount);

  const avatarText = useMemo(() => (agent?.displayName?.[0] || "A").toUpperCase(), [agent]);

  useEffect(() => {
    if (!slug) return;
    track("agent_view", { slug });
    fetch(`/api/agents/${slug}`)
      .then((r) => r.json())
      .then((data: { agent?: Agent }) => setAgent(data.agent || null))
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

  if (loading) return <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading...</CardContent></Card>;
  if (!agent) return <Card><CardContent className="p-6 text-sm text-muted-foreground">Agent not found.</CardContent></Card>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted text-xl font-semibold">{avatarText}</div>
            <div>
              <CardTitle>{agent.displayName}</CardTitle>
              <p className="text-sm text-muted-foreground">{agent.headline}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">{agent.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs">{tag}</span>)}</div>
          <p className="text-sm text-muted-foreground">⭐ {agent.rating} · calls {agent.calls}</p>
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
    </div>
  );
}