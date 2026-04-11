"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Github, Twitter } from "lucide-react";
import { useUIStore } from "@/store/ui";

export function EmailCTA() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const [email, setEmail] = useState("");

  const content = isZh
    ? {
        title: "准备开始了吗？",
        subtitle: "立即体验企业级数据服务，开启智能决策之旅",
        placeholder: "输入您的邮箱地址",
        button: "立即开始",
        hint: "免费试用，无需信用卡",
        links: {
          docs: "文档",
          github: "GitHub",
          twitter: "Twitter",
        },
      }
    : {
        title: "Ready to Get Started?",
        subtitle:
          "Experience enterprise-grade data services and start your journey to intelligent decisions",
        placeholder: "Enter your email address",
        button: "Get Started",
        hint: "Free trial, no credit card required",
        links: {
          docs: "Docs",
          github: "GitHub",
          twitter: "Twitter",
        },
      };

  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(99,102,241,0.15),transparent)]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 p-8 sm:p-12 overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl" />

          <div className="relative text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-6">
              <Sparkles className="h-4 w-4" />
              {isZh ? "免费开始" : "Free to Start"}
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              {content.title}
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
              {content.subtitle}
            </p>

            {/* Email Input */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.placeholder}
                className="h-12 bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-lg"
              />
              <Button
                size="lg"
                className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg whitespace-nowrap group"
              >
                {content.button}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Hint */}
            <p className="text-sm text-zinc-500 mb-8">{content.hint}</p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 pt-8 border-t border-zinc-800">
              <a
                href="/services"
                className="flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors text-sm"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                {content.links.docs}
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors text-sm"
              >
                <Github className="h-4 w-4" />
                {content.links.github}
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-zinc-500 hover:text-indigo-400 transition-colors text-sm"
              >
                <Twitter className="h-4 w-4" />
                {content.links.twitter}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
