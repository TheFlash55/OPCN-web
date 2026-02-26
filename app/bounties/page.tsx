"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import type { Bounty } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BountiesPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Bounty[]>([]);
  const [selected, setSelected] = useState<Bounty | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const fetchRows = async () => {
    const res = await fetch("/api/bounties");
    const data = (await res.json()) as { bounties: Bounty[] };
    setRows(data.bounties || []);
  };

  useEffect(() => {
    setToken(window.localStorage.getItem("opcn-token"));
    fetchRows();
  }, []);

  const claim = async (id: string) => {
    if (!token) {
      toast("请先登录再认领");
      return;
    }

    setClaimingId(id);
    try {
      const res = await fetch(`/api/bounties/${id}/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.message || "认领失败");
        return;
      }

      track("bounty_claimed", { bountyId: id });
      toast("认领成功");
      setRows((prev) => prev.map((b) => (b.id === id ? { ...b, status: "claimed" } : b)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, status: "claimed" } : prev));
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>悬赏列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rows.map((item) => (
            <div key={item.id} className="rounded-lg border border-border p-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">¥{item.reward} · {new Date(item.createdAt).toLocaleString()} · {item.status}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelected(item);
                        track("bounty_viewed", { bountyId: item.id });
                      }}
                    >
                      查看详情
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{selected?.title || item.title}</DialogTitle>
                      <DialogDescription>{selected?.desc || item.desc}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>奖励：¥{(selected?.reward || item.reward).toLocaleString()}</p>
                      <p>状态：{selected?.status || item.status}</p>
                      <Button
                        disabled={!token || (selected?.status || item.status) !== "open" || claimingId === item.id}
                        onClick={() => claim(item.id)}
                      >
                        {claimingId === item.id ? "处理中..." : "我来解决"}
                      </Button>
                      {!token && <p className="text-xs text-amber-400">需登录后可认领</p>}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}