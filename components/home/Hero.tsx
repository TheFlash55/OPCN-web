"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/ui";

export function Hero() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const [email, setEmail] = useState("");

  const content = isZh
    ? {
        badge: "🚀 专为一人公司设计的数据服务",
        title: "让数据驱动您的",
        titleHighlight: "商业决策",
        subtitle:
          "为OPC提供企业级数据采集、分析与洞察服务。无需技术团队，即可获得专业的数据支持，助力业务增长与政策研究。",
        ctaPrimary: "免费开始",
        ctaSecondary: "查看案例",
        emailPlaceholder: "输入邮箱，获取免费方案",
        trusted: "已服务 50+ OPC，值得信赖",
      }
    : {
        badge: "🚀 Data Services for One-Person Companies",
        title: "Let Data Drive Your",
        titleHighlight: "Business Decisions",
        subtitle:
          "Enterprise-grade data collection, analysis, and insights for OPCs. No tech team needed—get professional data support to boost growth and research.",
        ctaPrimary: "Get Started Free",
        ctaSecondary: "View Cases",
        emailPlaceholder: "Enter email for free plan",
        trusted: "Trusted by 50+ OPCs",
      };

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur">
            <Sparkles className="h-4 w-4" />
            {content.badge}
          </div>

          {/* Title */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {content.title}
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {content.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            {content.subtitle}
          </p>

          {/* Email CTA */}
          <div className="mx-auto mt-10 max-w-md">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.emailPlaceholder}
                className="h-14 border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:border-primary"
              />
              <Button
                size="lg"
                className="h-14 px-8 bg-primary hover:bg-primary/90"
              >
                {content.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="link"
              asChild
              className="text-slate-400 hover:text-white"
            >
              <Link href="/cases">
                <Play className="mr-2 h-4 w-4" />
                {content.ctaSecondary}
              </Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="mt-8 text-sm text-slate-500">{content.trusted}</p>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
