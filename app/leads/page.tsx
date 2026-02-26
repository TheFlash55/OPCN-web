"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Lead, LeadStatus } from "@/types";

export default function LeadsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<LeadStatus | "all">("all");
  const [rows, setRows] = useState<Lead[]>([]);

  useEffect(() => {
    setToken(window.localStorage.getItem("opcn-token"));
  }, []);

  useEffect(() => {
    if (!token) return;
    const params = new URLSearchParams();
    if (status !== "all") params.set("status", status);

    fetch(`/api/leads?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data: { leads?: Lead[] }) => setRows(data.leads || []));
  }, [token, status]);

  if (!token) {
    return (
      <Card>
        <CardHeader><CardTitle>Leads</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">需要先登录后查看。去 <Link className="underline" href="/signin">/signin</Link></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Leads</CardTitle>
        <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value as LeadStatus | "all")}>
          <option value="all">all</option><option value="new">new</option><option value="processing">processing</option><option value="closed">closed</option>
        </select>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rows.map((lead) => (
            <div key={lead.id} className="rounded-lg border border-border p-3 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(lead.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-muted-foreground">agent: {lead.agentSlug}</p>
              <p className="text-muted-foreground">budget: {lead.budgetRange} · urgency: {lead.urgency}</p>
              <p className="text-muted-foreground">status: {lead.status}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}