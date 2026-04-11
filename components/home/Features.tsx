"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Database,
  Settings,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Copy,
  Terminal,
} from "lucide-react";
import { useUIStore } from "@/store/ui";

const stepsZh = [
  {
    icon: Database,
    title: "创建 Agent",
    desc: "配置数据采集任务，选择监控目标和数据类型",
    code: "opc agent create --name=my-agent",
  },
  {
    icon: Settings,
    title: "发布服务",
    desc: "设置定价和交付说明，生成可分享的服务页",
    code: "opc agent publish --price=599",
  },
  {
    icon: BarChart3,
    title: "获取洞察",
    desc: "接收线索、分析数据、输出商业决策建议",
    code: "opc insights dashboard",
  },
];

const stepsEn = [
  {
    icon: Database,
    title: "Create Agent",
    desc: "Configure data collection tasks and select monitoring targets",
    code: "opc agent create --name=my-agent",
  },
  {
    icon: Settings,
    title: "Publish Service",
    desc: "Set pricing and delivery notes, generate shareable page",
    code: "opc agent publish --price=599",
  },
  {
    icon: BarChart3,
    title: "Get Insights",
    desc: "Receive leads, analyze data, output business decisions",
    code: "opc insights dashboard",
  },
];

export function Features() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const steps = isZh ? stepsZh : stepsEn;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const content = isZh
    ? {
        title: "三步快速开始",
        subtitle: "从创建到上线，只需几分钟",
        whyTitle: "为什么选择我们？",
        features: [
          { title: "全链路服务", desc: "从采集到洞察，一站式数据解决方案" },
          { title: "企业级可靠", desc: "99.9%可用性，支持高并发数据处理" },
          { title: "灵活定价", desc: "按需付费，适合不同规模的企业" },
        ],
        cta: "查看教程",
      }
    : {
        title: "Quick Start in 3 Steps",
        subtitle: "From creation to launch in minutes",
        whyTitle: "Why Choose Us?",
        features: [
          {
            title: "End-to-End",
            desc: "From collection to insights, one-stop solution",
          },
          {
            title: "Enterprise Grade",
            desc: "99.9% uptime, high concurrency support",
          },
          {
            title: "Flexible Pricing",
            desc: "Pay as you go, fit for all sizes",
          },
        ],
        cta: "View Tutorial",
      };

  return (
    <section className="py-24 bg-[#0a0a0f] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">{content.subtitle}</p>
        </div>

        {/* 3 Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 h-full overflow-hidden">
                <CardContent className="p-6">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold">
                        {idx + 1}
                      </span>
                      <step.icon className="h-5 w-5 text-indigo-400" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4">{step.desc}</p>

                  {/* Code Snippet */}
                  <div className="relative rounded-lg bg-zinc-950 border border-zinc-800 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Terminal className="h-3 w-3 text-zinc-600" />
                      <button
                        onClick={() => handleCopy(step.code, idx)}
                        className="text-zinc-600 hover:text-zinc-400 transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-zinc-500 block">
                      {step.code}
                    </code>
                  </div>
                </CardContent>
              </Card>

              {/* Connector Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-zinc-700" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {content.whyTitle}
              </h3>
              <div className="space-y-4">
                {content.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-zinc-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                {content.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Decorative Code Block */}
            <div className="hidden lg:block relative">
              <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-zinc-600">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <span className="ml-2 text-xs">example.config.js</span>
                </div>
                <pre className="text-zinc-500 leading-relaxed">
                  <span className="text-purple-400">export default</span> {`{`}
                  {"\n"} <span className="text-blue-400">agent</span>: {`{`}
                  {"\n"} <span className="text-green-400">name</span>:{" "}
                  <span className="text-yellow-400">"Data Collector"</span>,
                  {"\n"} <span className="text-green-400">type</span>:{" "}
                  <span className="text-yellow-400">"monitoring"</span>,{"\n"}{" "}
                  <span className="text-green-400">interval</span>:{" "}
                  <span className="text-orange-400">"5m"</span>
                  {"\n"} {`}`},{"\n"}{" "}
                  <span className="text-blue-400">output</span>:{" "}
                  <span className="text-yellow-400">"insights"</span>
                  {"\n"}
                  {`}`}
                </pre>
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-2xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
