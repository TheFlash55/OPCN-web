"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Building2, Zap, Database } from "lucide-react";
import { useUIStore } from "@/store/ui";

export function Hero() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const [email, setEmail] = useState("");

  const content = isZh
    ? {
        badge: "企业级智能数据基础设施",
        title: "企业级数据智能，",
        titleHighlight: "重塑商业决策力",
        subtitle:
          "DNN 为 OPC（一人公司）提供全链路数据智能解决方案，从采集到决策，驱动业务增长与政策研究",
        ctaPrimary: "预约演示",
        emailPlaceholder: "输入企业邮箱，预约专属演示",
        trusted: "99.9% 系统可用性，企业级高可用架构",
        stats: [
          {
            icon: Building2,
            value: "50+",
            label: "服务企业",
            desc: "覆盖电商、金融、政务等多领域",
          },
          {
            icon: Zap,
            value: "<100ms",
            label: "查询响应",
            desc: "高性能实时数据处理能力",
          },
          {
            icon: Database,
            value: "10+",
            label: "数据类型支持",
            desc: "结构化与非结构化数据全覆盖",
          },
        ],
      }
    : {
        badge: "Enterprise-Grade Data Infrastructure",
        title: "Enterprise Data Intelligence, ",
        titleHighlight: "Reshaping Business Decisions",
        subtitle:
          "DNN provides end-to-end data intelligence solutions for OPCs, from collection to decision-making, driving business growth and policy research",
        ctaPrimary: "Book Demo",
        emailPlaceholder: "Enter business email to book demo",
        trusted: "99.9% System Uptime, Enterprise-Grade High Availability",
        stats: [
          {
            icon: Building2,
            value: "50+",
            label: "Enterprise Clients",
            desc: "Covering e-commerce, finance, government",
          },
          {
            icon: Zap,
            value: "<100ms",
            label: "Query Response",
            desc: "High-performance real-time processing",
          },
          {
            icon: Database,
            value: "10+",
            label: "Data Types",
            desc: "Full coverage of structured & unstructured data",
          },
        ],
      };

  return (
    <section className="relative overflow-hidden bg-[#0a1628]">
      {/* Tech Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1e40af 1px, transparent 1px),
            linear-gradient(to bottom, #1e40af 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_rgba(30,64,175,0.15),transparent_60%)]" />

      {/* Horizontal accent lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e40af]/30 to-transparent" />
      <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e40af]/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-[#1e40af]/40 bg-[#1e40af]/10 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-blue-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {content.badge}
          </div>

          {/* Title */}
          <h1 className="mx-auto max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {content.title}
            <br className="hidden sm:block" />
            <span className="text-[#3b82f6]">{content.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg font-medium text-slate-300 leading-relaxed px-4 sm:px-0">
            {content.subtitle}
          </p>

          {/* Email CTA */}
          <div className="mx-auto mt-8 sm:mt-12 max-w-xl px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.emailPlaceholder}
                className="h-12 sm:h-14 border-slate-600/50 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:border-[#3b82f6] focus-visible:ring-[#3b82f6]/20 rounded-lg"
              />
              <Button
                asChild
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold rounded-lg whitespace-nowrap"
              >
                <Link href="/onboarding">
                  {content.ctaPrimary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Trust Badge */}
          <p className="mt-6 sm:mt-8 text-xs sm:text-sm font-medium text-slate-400">
            {content.trusted}
          </p>

          {/* Stats Section - Data Driven Value */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {content.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl border border-slate-700/50 bg-slate-800/30 p-5 sm:p-6 backdrop-blur-sm hover:border-[#1e40af]/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  {/* Accent corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-xl">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#1e40af]/20 to-transparent transform rotate-45 translate-x-8 -translate-y-8" />
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-[#1e40af]/10 p-2.5 sm:p-3">
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#3b82f6]" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-slate-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
