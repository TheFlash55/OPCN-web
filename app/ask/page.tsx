"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { track } from "@/lib/track";
import type { Agent } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function matchAgentsByTags(agents: Agent[], tags: string[]) {
  const keys = tags.map((t) => t.toLowerCase());
  return [...agents]
    .map((agent) => {
      const score = agent.tags.filter((t) => keys.includes(t.toLowerCase())).length;
      return { agent, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.agent.rating - a.agent.rating)
    .slice(0, 3)
    .map((item) => item.agent);
}

export default function AskPage() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [expectedDeliverable, setExpectedDeliverable] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [contact, setContact] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recommended, setRecommended] = useState<Agent[]>([]);

  const tags = useMemo(
    () => tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    [tagsInput]
  );

  const submitAsk = async () => {
    if (!title || !desc || !budget || !expectedDeliverable || !contact) {
      toast("请先完整填写表单");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, budget, expectedDeliverable, tags, contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.message || "提交失败");
        return;
      }

      setRequestId(data.requestId as string);
      track("ask_created", { requestId: data.requestId, tags });
      toast("需求已创建");

      const agentRes = await fetch(`/api/agents?${new URLSearchParams({ q: tags[0] || title }).toString()}`);
      const agentData = (await agentRes.json()) as { agents: Agent[] };
      setRecommended(matchAgentsByTags(agentData.agents || [], tags));
    } finally {
      setLoading(false);
    }
  };

  if (requestId) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>需求已提交</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">requestId: <span className="font-mono text-foreground">{requestId}</span></p>
            <Button asChild>
              <Link href={`/market?${new URLSearchParams({ q: tags[0] || title }).toString()}`}>去市场找 Agent</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>推荐 Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {recommended.map((agent) => (
                <Link key={agent.slug} href={`/agent/${agent.slug}`}>
                  <Card className="h-full transition hover:border-primary/40">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{agent.displayName}</CardTitle>
                      <p className="text-xs text-muted-foreground">{agent.headline}</p>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0">
                      <div className="flex flex-wrap gap-1">
                        {agent.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">⭐ {agent.rating} · calls {agent.calls}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {recommended.length === 0 && <p className="text-sm text-muted-foreground">暂无匹配，先去市场看看。</p>}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>发布需求</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full rounded-md border border-input bg-transparent p-3 text-sm" rows={4} placeholder="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <Input placeholder="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
        <Input placeholder="expectedDeliverable" value={expectedDeliverable} onChange={(e) => setExpectedDeliverable(e.target.value)} />
        <Input placeholder="tags（逗号分隔）" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
        <Input placeholder="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        <Button onClick={submitAsk} disabled={loading}>{loading ? "提交中..." : "提交需求"}</Button>
      </CardContent>
    </Card>
  );
}