"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useOnboardingStore } from "@/store/onboarding";
import { useAcquisitionStore } from "@/store/acquisition";
import { track } from "@/lib/track";

const steps = ["position", "offer", "delivery", "publish"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const step = useOnboardingStore((s) => s.step);
  const draft = useOnboardingStore((s) => s.draft);
  const setStep = useOnboardingStore((s) => s.setStep);
  const setBaseInfo = useOnboardingStore((s) => s.setBaseInfo);
  const updateOffer = useOnboardingStore((s) => s.updateOffer);
  const setDeliveryNote = useOnboardingStore((s) => s.setDeliveryNote);
  const setSlug = useOnboardingStore((s) => s.setSlug);
  const reset = useOnboardingStore((s) => s.reset);

  const inviteCode = useAcquisitionStore((s) => s.inviteCode);
  const setHasDraftAgent = useAcquisitionStore((s) => s.setHasDraftAgent);
  const setPublished = useAcquisitionStore((s) => s.setPublished);

  const [tagsInput, setTagsInput] = useState(draft.tags.join(", "));
  const [submitting, setSubmitting] = useState(false);

  const goNext = () => {
    setHasDraftAgent(true);
    setStep(Math.min(step + 1, 3));
  };

  const goBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const persistTags = () => {
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setBaseInfo({ displayName: draft.displayName, headline: draft.headline, tags });
  };

  const publishAgent = async () => {
    setSubmitting(true);
    try {
      persistTags();
      const token = window.localStorage.getItem("opcn-token");

      const createRes = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          slug: draft.slug,
          displayName: draft.displayName,
          headline: draft.headline,
          tags: tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          offers: draft.offers,
          deliveryNote: draft.deliveryNote,
        }),
      });
      const created = (await createRes.json()) as { agent: { slug: string } };
      setSlug(created.agent.slug);

      const publishRes = await fetch("/api/agents/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ slug: created.agent.slug, inviteCode }),
      });
      const published = (await publishRes.json()) as { slug: string; shareUrl: string };

      setHasDraftAgent(true);
      setPublished(published.slug, published.shareUrl);
      track("agent_published", { slug: published.slug, source: "onboarding" });
      toast("发布成功");
      reset();
      router.push(`/agent/${published.slug}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Onboarding（四步）</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={steps[step]}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="position">1 定位</TabsTrigger>
            <TabsTrigger value="offer">2 Offer</TabsTrigger>
            <TabsTrigger value="delivery">3 交付</TabsTrigger>
            <TabsTrigger value="publish">4 发布</TabsTrigger>
          </TabsList>

          <TabsContent value="position" className="space-y-4">
            <Input
              placeholder="displayName"
              value={draft.displayName}
              onChange={(e) =>
                setBaseInfo({
                  displayName: e.target.value,
                  headline: draft.headline,
                  tags: draft.tags,
                })
              }
            />
            <Input
              placeholder="headline"
              value={draft.headline}
              onChange={(e) =>
                setBaseInfo({
                  displayName: draft.displayName,
                  headline: e.target.value,
                  tags: draft.tags,
                })
              }
            />
            <Input
              placeholder="tags: 增长, 自动化, 内容"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onBlur={persistTags}
            />
          </TabsContent>

          <TabsContent value="offer" className="space-y-4">
            {draft.offers.map((offer, index) => (
              <div key={offer.tier} className="rounded-lg border border-border p-4">
                <p className="mb-3 font-medium uppercase">{offer.tier}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    type="number"
                    value={offer.price}
                    onChange={(e) => updateOffer(index, { price: Number(e.target.value || 0) })}
                    placeholder="price"
                  />
                  <Input
                    type="number"
                    value={offer.durationDays}
                    onChange={(e) => updateOffer(index, { durationDays: Number(e.target.value || 0) })}
                    placeholder="durationDays"
                  />
                </div>
                <textarea
                  className="mt-3 w-full rounded-md border border-input bg-transparent p-3 text-sm"
                  rows={3}
                  value={offer.deliverables.join("\n")}
                  onChange={(e) =>
                    updateOffer(index, {
                      deliverables: e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="deliverables（每行一条）"
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="delivery" className="space-y-4">
            <textarea
              className="w-full rounded-md border border-input bg-transparent p-3 text-sm"
              rows={6}
              value={draft.deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              placeholder="交付说明"
            />
          </TabsContent>

          <TabsContent value="publish" className="space-y-4">
            <div className="rounded-lg border border-border p-4 text-sm">
              <p><strong>名称：</strong>{draft.displayName || "-"}</p>
              <p><strong>副标题：</strong>{draft.headline || "-"}</p>
              <p><strong>标签：</strong>{draft.tags.join(" / ") || "-"}</p>
              <p><strong>交付：</strong>{draft.deliveryNote || "-"}</p>
            </div>
            <Button onClick={publishAgent} disabled={submitting}>
              {submitting ? "发布中..." : "发布 Agent"}
            </Button>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between">
          <Button variant="outline" onClick={goBack} disabled={step === 0}>
            Back
          </Button>
          <Button onClick={goNext} disabled={step === 3}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}