"use client";

import {
  Database,
  BarChart3,
  FileSearch,
  Shield,
  Zap,
  Clock,
} from "lucide-react";
import { useUIStore } from "@/store/ui";

const featuresZh = [
  {
    icon: Database,
    title: "智能数据采集",
    description: "自动监控竞品价格、政策动态、舆情信息，7×24小时不间断采集",
  },
  {
    icon: BarChart3,
    title: "深度数据分析",
    description: "清洗、结构化、标注全流程处理，将原始数据转化为可用信息",
  },
  {
    icon: FileSearch,
    title: "商业洞察报告",
    description: "自动生成趋势分析、竞品对比、决策建议，助力商业决策",
  },
  {
    icon: Shield,
    title: "合规数据实践",
    description: "仅采集公开数据，遵循《数据安全法》，匿名化处理保障安全",
  },
  {
    icon: Zap,
    title: "极速交付",
    description: "简单任务3-5天上线，完整系统1-2周交付，快速见效",
  },
  {
    icon: Clock,
    title: "实时预警",
    description: "竞品价格变动、政策更新即时推送，5分钟内响应市场变化",
  },
];

const featuresEn = [
  {
    icon: Database,
    title: "Smart Data Collection",
    description:
      "Automatically monitor competitor prices, policy changes, and sentiment 24/7",
  },
  {
    icon: BarChart3,
    title: "Deep Data Analysis",
    description:
      "Full pipeline: cleaning, structuring, labeling—raw data to actionable info",
  },
  {
    icon: FileSearch,
    title: "Business Insights",
    description:
      "Auto-generated trend analysis, competitor comparison, and decision recommendations",
  },
  {
    icon: Shield,
    title: "Compliant Practice",
    description:
      "Only public data, following Data Security Law, anonymized processing",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Simple tasks live in 3-5 days, full systems in 1-2 weeks",
  },
  {
    icon: Clock,
    title: "Real-time Alerts",
    description:
      "Instant push for price changes and policy updates—respond in 5 minutes",
  },
];

export function Features() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const features = isZh ? featuresZh : featuresEn;

  const content = isZh
    ? {
        title: "全方位数据服务能力",
        subtitle: "从采集到洞察，一站式解决您的数据需求",
      }
    : {
        title: "Comprehensive Data Services",
        subtitle:
          "From collection to insights—one-stop solution for your data needs",
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-primary/50 hover:bg-slate-900"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
