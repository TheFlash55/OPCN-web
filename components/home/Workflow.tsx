"use client";

import { Database, Settings, BarChart3, Rocket } from "lucide-react";
import { useUIStore } from "@/store/ui";

const stepsZh = [
  {
    icon: Database,
    step: "01",
    title: "数据采集",
    description: "部署爬虫监控目标网站，自动采集价格、库存、评论等数据",
  },
  {
    icon: Settings,
    step: "02",
    title: "清洗处理",
    description: "去重、格式化、异常检测，将原始数据转化为结构化信息",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "分析洞察",
    description: "趋势分析、竞品对比、情感分析，挖掘数据价值",
  },
  {
    icon: Rocket,
    step: "04",
    title: "报告交付",
    description: "自动生成可视化报告，实时推送关键指标预警",
  },
];

const stepsEn = [
  {
    icon: Database,
    step: "01",
    title: "Data Collection",
    description:
      "Deploy crawlers to monitor target sites, auto-collect prices, inventory, reviews",
  },
  {
    icon: Settings,
    step: "02",
    title: "Processing",
    description:
      "Deduplication, formatting, anomaly detection—raw to structured data",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Analysis",
    description:
      "Trend analysis, competitor comparison, sentiment analysis—unlock data value",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Delivery",
    description:
      "Auto-generated visual reports with real-time alerts for key metrics",
  },
];

export function Workflow() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const steps = isZh ? stepsZh : stepsEn;

  const content = isZh
    ? {
        title: "简单四步，开启数据之旅",
        subtitle: "无需技术背景，我们全程协助您完成数据自动化",
      }
    : {
        title: "Start Your Data Journey in 4 Steps",
        subtitle:
          "No tech background needed—we assist you throughout the automation",
      };

  return (
    <section className="py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{content.subtitle}</p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${idx % 2 === 1 ? "lg:text-right" : ""}`}
                >
                  <div
                    className={`inline-flex items-center gap-3 mb-4 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  >
                    <span className="text-5xl font-bold text-slate-800">
                      {item.step}
                    </span>
                    <div className="p-3 rounded-xl bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 max-w-md">{item.description}</p>
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex-shrink-0 w-4 h-4 rounded-full bg-primary ring-4 ring-slate-950 hidden lg:block" />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
