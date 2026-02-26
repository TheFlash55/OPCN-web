"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Agent } from "@/types";

function minPrice(agent: Agent) {
  return Math.min(...agent.offers.map((o) => o.price));
}

export default function MarketPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [allAgents, setAllAgents] = useState<Agent[]>([]);
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("recommended");

  const fetchAgents = async () => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (tag) params.set("tag", tag);
    params.set("sort", sort);

    const res = await fetch(`/api/agents?${params.toString()}`);
    const data = (await res.json()) as { agents: Agent[] };
    setAgents(data.agents || []);
  };

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, tag, sort]);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then((data: { agents: Agent[] }) => setAllAgents(data.agents || []));
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    allAgents.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [allAgents]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Agent 广场</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索名称/副标题/tag" />
          <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="">全部标签</option>
            {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recommended">recommended</option>
            <option value="newest">newest</option>
            <option value="rating">rating</option>
            <option value="hot">hot</option>
          </select>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {agents.map((agent) => (
          <Link key={agent.slug} href={`/agent/${agent.slug}`}>
            <Card className="h-full transition hover:border-primary/40">
              <CardHeader>
                <CardTitle className="text-lg">{agent.displayName}</CardTitle>
                <p className="text-sm text-muted-foreground">{agent.headline}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((t) => <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{t}</span>)}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>最低价 ¥{minPrice(agent)}</span>
                  <span className="text-muted-foreground">⭐ {agent.rating} · calls {agent.calls}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}