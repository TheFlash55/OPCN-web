"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Settings,
  Database,
  FileText,
  RefreshCw,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useUIStore } from "@/store/ui";

const workflowsZh = [
  {
    icon: MessageSquare,
    title: "需求沟通",
    desc: "深入了解业务场景，明确数据采集目标",
    tag: "Step 1",
  },
  {
    icon: Settings,
    title: "方案定制",
    desc: "设计专属数据采集与处理方案",
    tag: "Step 2",
  },
  {
    icon: Database,
    title: "数据采集",
    desc: "7×24小时自动化监控与采集",
    tag: "Step 3",
  },
  {
    icon: FileText,
    title: "分析报告",
    desc: "自动生成洞察报告与决策建议",
    tag: "Step 4",
  },
  {
    icon: RefreshCw,
    title: "持续优化",
    desc: "根据反馈迭代优化数据服务",
    tag: "Step 5",
  },
];

const workflowsEn = [
  {
    icon: MessageSquare,
    title: "Discovery",
    desc: "Understand business needs and goals",
    tag: "Step 1",
  },
  {
    icon: Settings,
    title: "Custom Solution",
    desc: "Design tailored data strategy",
    tag: "Step 2",
  },
  {
    icon: Database,
    title: "Collection",
    desc: "24/7 automated monitoring",
    tag: "Step 3",
  },
  {
    icon: FileText,
    title: "Analysis",
    desc: "Automated insights & reports",
    tag: "Step 4",
  },
  {
    icon: RefreshCw,
    title: "Optimization",
    desc: "Continuous improvement based on feedback",
    tag: "Step 5",
  },
];

const casesZh = [
  {
    name: "竞品价格监控",
    result: "效率提升 300%",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "政策动态追踪",
    result: "响应速度 <5min",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "舆情分析系统",
    result: "准确率 95%+",
    color: "from-orange-500 to-red-500",
  },
];

const casesEn = [
  {
    name: "Price Monitoring",
    result: "300% Efficiency",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Policy Tracking",
    result: "<5min Response",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Sentiment Analysis",
    result: "95%+ Accuracy",
    color: "from-orange-500 to-red-500",
  },
];

export function Workflow() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const workflows = isZh ? workflowsZh : workflowsEn;
  const cases = isZh ? casesZh : casesEn;

  const content = isZh
    ? {
        title: "服务流程",
        subtitle: "标准化交付，确保每个环节质量可控",
        casesTitle: "成功案例",
        casesSubtitle: "查看全部 →",
        cta: "开始您的项目",
      }
    : {
        title: "Our Process",
        subtitle: "Standardized delivery with quality control",
        casesTitle: "Success Stories",
        casesSubtitle: "View all →",
        cta: "Start Your Project",
      };

  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">{content.subtitle}</p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent hidden lg:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {workflows.map((step, idx) => (
              <Card
                key={idx}
                className="relative bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <CardContent className="p-5">
                  {/* Tag */}
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-indigo-400 bg-indigo-500/10 rounded mb-3">
                    {step.tag}
                  </span>

                  {/* Icon */}
                  <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-indigo-500/20 transition-colors">
                    <step.icon className="h-5 w-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-500">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Cases */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-white">
              {content.casesTitle}
            </h3>
            <Link
              href="/cases"
              className="text-sm text-zinc-500 hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              {content.casesSubtitle}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {cases.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-6 group hover:border-zinc-700 transition-all"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative">
                  <h4 className="font-medium text-white mb-2">{item.name}</h4>
                  <p className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    {item.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button
            asChild
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8"
          >
            <Link href="/contact">
              {content.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
