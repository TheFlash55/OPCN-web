"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Play,
  Github,
  Sparkles,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { useUIStore } from "@/store/ui";

export function Hero() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const [email, setEmail] = useState("");

  const content = isZh
    ? {
        badge: "智能数据基础设施",
        title: "企业级数据智能",
        titleHighlight: "重塑商业决策",
        subtitle:
          "为 OPC（一人公司）提供全链路数据智能解决方案，从采集到决策，驱动业务增长",
        ctaPrimary: "立即开始",
        ctaSecondary: "浏览市场",
        ctaGhost: "查看文档",
        placeholder: "输入邮箱开始",
        codeLabel: "快速接入",
        code: `curl -X POST https://api.opcn.ai/v1/agents \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{"name": "My Agent"}'`,
      }
    : {
        badge: "Data Infrastructure",
        title: "Enterprise Data Intelligence",
        titleHighlight: "Reshaping Decisions",
        subtitle:
          "End-to-end data intelligence solutions for OPCs, from collection to decision-making",
        ctaPrimary: "Get Started",
        ctaSecondary: "Browse Market",
        ctaGhost: "View Docs",
        placeholder: "Enter email to start",
        codeLabel: "Quick Start",
        code: `curl -X POST https://api.opcn.ai/v1/agents \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{"name": "My Agent"}'`,
      };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.3),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(139,92,246,0.15),transparent)]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
              <Sparkles className="h-4 w-4" />
              {content.badge}
              <span className="ml-1 text-indigo-400">→</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {content.title}
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {content.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.subtitle}
            </p>

            {/* CTA Buttons - Triple Layout */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 h-11 rounded-lg group"
              >
                <Link href="/onboarding">
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white px-6 h-11 rounded-lg"
              >
                <Link href="/market">{content.ctaSecondary}</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-zinc-500 hover:text-zinc-300 px-6 h-11 rounded-lg hidden sm:flex"
              >
                <Link href="/services" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  {content.ctaGhost}
                </Link>
              </Button>
            </div>

            {/* Email Input */}
            <div className="mt-8 max-w-md mx-auto lg:mx-0">
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.placeholder}
                  className="h-11 bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-lg"
                />
                <Button className="h-11 px-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Code Block */}
          <div className="relative">
            <div className="relative rounded-xl bg-zinc-900/80 border border-zinc-800 overflow-hidden">
              {/* Code Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-zinc-500" />
                  <span className="text-xs text-zinc-500 font-mono">
                    {content.codeLabel}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
              </div>
              {/* Code Content */}
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-zinc-300 leading-relaxed">
                  <code>{content.code}</code>
                </pre>
              </div>
              {/* Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-xl blur-sm -z-10" />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-4 -right-4 bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 shadow-xl hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-400 text-xs font-bold">50+</span>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Agents</p>
                  <p className="text-sm text-white font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
