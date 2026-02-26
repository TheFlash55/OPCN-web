"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, ExternalLink, Sparkles } from "lucide-react";
import { useAcquisitionStore } from "@/store/acquisition";
import { track } from "@/lib/track";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

function buildPromos(shareUrl: string) {
  return {
    xiaohongshu: `我刚把自己的 Agent 做成了可直接分享的接单页：${shareUrl}。三步就能上线，今天就能跑第一波线索。`,
    moments: `OPCN 客源页上线了，链接：${shareUrl}。现在支持发布分享、线索承接和持续优化。`,
    dm: `给你一个我 Agent 的直达链接：${shareUrl}。你看完如果合适，我可以按你的场景快速做一版。`,
  };
}

function StepDot({ n }: { n: number }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
      {n}
    </span>
  );
}

export function AcquisitionPanel() {
  const router = useRouter();
  const { toast } = useToast();

  const hasDraftAgent = useAcquisitionStore((s) => s.hasDraftAgent);
  const publishedSlug = useAcquisitionStore((s) => s.publishedSlug);
  const shareUrl = useAcquisitionStore((s) => s.shareUrl);
  const leadCount = useAcquisitionStore((s) => s.leadCount);
  const inviteCode = useAcquisitionStore((s) => s.inviteCode);
  const setHasDraftAgent = useAcquisitionStore((s) => s.setHasDraftAgent);
  const setPublished = useAcquisitionStore((s) => s.setPublished);
  const setLeadCount = useAcquisitionStore((s) => s.setLeadCount);

  const [publishing, setPublishing] = useState(false);

  const refreshLeadCount = async () => {
    try {
      const res = await fetch("/api/leads/count");
      const data = (await res.json()) as { count?: number };
      if (typeof data.count === "number") setLeadCount(data.count);
    } catch {
      // noop
    }
  };

  useEffect(() => {
    refreshLeadCount();
    const onLeadCreated = () => refreshLeadCount();
    window.addEventListener("lead:created", onLeadCreated);
    return () => window.removeEventListener("lead:created", onLeadCreated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const promos = useMemo(() => {
    return buildPromos(shareUrl ?? `/agent/${publishedSlug ?? "demo"}?ref=${inviteCode}`);
  }, [shareUrl, publishedSlug, inviteCode]);

  const handleStartDraft = () => {
    setHasDraftAgent(true);
    track("agent_draft_started", { source: "acquisition_panel" });
    router.push("/onboarding");
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const token = window.localStorage.getItem("opcn-token");
      const res = await fetch("/api/agents/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ inviteCode }),
      });
      const data = (await res.json()) as { slug: string; shareUrl: string };
      setPublished(data.slug, data.shareUrl);
      setHasDraftAgent(true);
      track("agent_published", { slug: data.slug, shareUrl: data.shareUrl });
      toast("发布成功");
    } finally {
      setPublishing(false);
    }
  };

  const handleCopy = async (content: string, eventName: string) => {
    await navigator.clipboard.writeText(content);
    track(eventName, { content });
    toast("已复制");
  };

  const handleViewLeads = () => {
    track("view_leads_clicked", { leadCount });
    router.push("/leads");
  };

  return (
    <Card className="surface border-border/80 bg-card/70 lg:sticky lg:top-24">
      <CardHeader className="space-y-2 border-b border-border/70 pb-4">
        <CardTitle className="text-xl">客源启动台</CardTitle>
        <p className="text-sm text-muted-foreground">三步把你的 Agent 变成可分享的获客页</p>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="space-y-3 rounded-lg border border-border/70 bg-background/30 p-4 transition hover:border-primary/40">
          <div className="flex items-center gap-3">
            <StepDot n={1} />
            <p className="font-medium">创建 Agent</p>
          </div>
          {hasDraftAgent ? (
            <p className="pl-9 text-sm text-emerald-400">✅ 已创建</p>
          ) : (
            <div className="pl-9">
              <Button size="sm" onClick={handleStartDraft}>
                开始创建
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3 rounded-lg border border-border/70 bg-background/30 p-4 transition hover:border-primary/40">
          <div className="flex items-center gap-3">
            <StepDot n={2} />
            <p className="font-medium">发布获客页</p>
          </div>
          {shareUrl ? (
            <div className="pl-9">
              <div className="flex items-center justify-between rounded-md border border-border/80 bg-background px-3 py-2 text-sm">
                <span className="truncate">{shareUrl}</span>
                <button
                  aria-label="复制分享链接"
                  className="ml-3 opacity-80 transition hover:opacity-100"
                  onClick={() => handleCopy(shareUrl, "share_copied")}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="pl-9">
              <Button size="sm" onClick={handlePublish} disabled={publishing}>
                {publishing ? "发布中..." : "发布"}
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3 rounded-lg border border-border/70 bg-background/30 p-4 transition hover:border-primary/40">
          <div className="flex items-center gap-3">
            <StepDot n={3} />
            <p className="font-medium">一键投放</p>
          </div>

          <div className="space-y-2 pl-9">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => track("promo_generated", { shareUrl: shareUrl ?? null })}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  生成投放素材
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>投放素材</DialogTitle>
                  <DialogDescription>三套可直接复制的文案。</DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  {[
                    { key: "小红书", value: promos.xiaohongshu },
                    { key: "朋友圈", value: promos.moments },
                    { key: "私聊", value: promos.dm },
                  ].map((item) => (
                    <div key={item.key} className="rounded-lg border border-border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-medium">{item.key}</p>
                        <Button size="sm" variant="ghost" onClick={() => handleCopy(item.value, "share_copied")}>
                          <Copy className="mr-1 h-4 w-4" />复制
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <Button size="sm" variant="outline" onClick={handleViewLeads}>
              <ExternalLink className="mr-2 h-4 w-4" />
              查看线索
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs text-white">
                {leadCount}
              </span>
            </Button>

            {publishedSlug && (
              <p className="text-xs text-muted-foreground">
                已发布页面：
                <Link href={`/agent/${publishedSlug}`} className="underline underline-offset-2">
                  /agent/{publishedSlug}
                </Link>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}