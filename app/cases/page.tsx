"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Clock,
  Database,
  BarChart3,
  FileText,
  CheckCircle2,
  ArrowRight,
  Download,
} from "lucide-react";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import Link from "next/link";

export default function CasesPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);
  const isZh = locale === "zh";

  const content = isZh
    ? {
        title: "案例研究",
        subtitle: "真实客户案例，展示数据采集到商业决策的完整流程",
        case: {
          client: "某跨境电商 OPC",
          industry: "电商 / 3C数码",
          challenge: {
            title: "客户痛点",
            items: [
              "手动监控5个主要竞争对手的价格，每天花费2-3小时",
              "错过竞争对手的促销活动，导致销量下滑20%",
              "无法及时发现市场趋势变化，库存积压严重",
              "没有系统化的竞品数据，定价决策靠直觉",
            ],
          },
          solution: {
            title: "解决方案",
            steps: [
              {
                icon: Database,
                title: "数据采集",
                desc: "部署爬虫监控Amazon、淘宝、京东等5个平台的15个竞品SKU",
                details: [
                  "价格、库存、促销信息每小时采集",
                  "评论情感分析，提取用户痛点",
                  "页面渲染使用Playwright，确保动态内容抓取",
                ],
              },
              {
                icon: BarChart3,
                title: "数据处理",
                desc: "清洗、结构化数据，建立竞品价格数据库",
                details: [
                  "异常价格自动识别和过滤",
                  "价格变动趋势计算（日/周/月）",
                  "促销标签自动分类（满减、秒杀、会员价）",
                ],
              },
              {
                icon: FileText,
                title: "洞察报告",
                desc: "每日自动生成竞品监控报告",
                details: [
                  "价格变动预警（降价超过5%立即通知）",
                  "促销时机分析（最佳跟进时间建议）",
                  "市场份额估算和趋势预测",
                ],
              },
            ],
          },
          results: {
            title: "项目成果",
            stats: [
              {
                value: "90%",
                label: "时间节省",
                desc: "从每天3小时降至15分钟查看报告",
              },
              {
                value: "25%",
                label: "销量提升",
                desc: "及时跟进促销策略，抓住销售机会",
              },
              {
                value: "30%",
                label: "库存优化",
                desc: "基于趋势预测，减少滞销库存",
              },
            ],
          },
          testimonial: {
            text: "这个系统让我从繁杂的手动监控中解放出来，现在我能专注于选品和营销策略。ROI在第一个月就回本了。",
            author: "OPC 创始人",
          },
          cta: {
            title: "想获得类似的成果？",
            desc: "每个 OPC 的需求都不同，让我们聊聊您的具体情况",
            button: "预约免费咨询",
          },
        },
      }
    : {
        title: "Case Studies",
        subtitle:
          "Real customer cases showing the complete flow from data collection to business decisions",
        case: {
          client: "Cross-border E-commerce OPC",
          industry: "E-commerce / 3C Digital",
          challenge: {
            title: "Challenges",
            items: [
              "Manually monitoring 5 competitors' prices, 2-3 hours daily",
              "Missing competitor promotions, 20% sales drop",
              "Unable to spot market trends, serious inventory backlog",
              "No systematic competitor data, pricing by intuition",
            ],
          },
          solution: {
            title: "Solution",
            steps: [
              {
                icon: Database,
                title: "Data Collection",
                desc: "Deployed crawlers to monitor 15 competitor SKUs across 5 platforms",
                details: [
                  "Hourly collection of price, inventory, promotion info",
                  "Review sentiment analysis to extract pain points",
                  "Playwright for dynamic content rendering",
                ],
              },
              {
                icon: BarChart3,
                title: "Data Processing",
                desc: "Cleaned and structured data, built competitor price database",
                details: [
                  "Automatic outlier detection and filtering",
                  "Price trend calculation (daily/weekly/monthly)",
                  "Auto-classification of promotion types",
                ],
              },
              {
                icon: FileText,
                title: "Insight Reports",
                desc: "Automated daily competitor monitoring reports",
                details: [
                  "Price drop alerts (notify when >5% decrease)",
                  "Promotion timing analysis",
                  "Market share estimation and trend prediction",
                ],
              },
            ],
          },
          results: {
            title: "Results",
            stats: [
              {
                value: "90%",
                label: "Time Saved",
                desc: "From 3 hours daily to 15 minutes reviewing reports",
              },
              {
                value: "25%",
                label: "Sales Increase",
                desc: "Timely promotion strategy follow-up",
              },
              {
                value: "30%",
                label: "Inventory Optimization",
                desc: "Reduced dead stock based on trend prediction",
              },
            ],
          },
          testimonial: {
            text: "This system freed me from tedious manual monitoring. Now I can focus on product selection and marketing strategy. ROI paid off in the first month.",
            author: "OPC Founder",
          },
          cta: {
            title: "Want similar results?",
            desc: "Every OPC's needs are different. Let's talk about your specific situation",
            button: "Book Free Consultation",
          },
        },
      };

  const { case: caseData } = content;

  return (
    <div className="space-y-8 min-h-screen">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {content.title}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">{content.subtitle}</p>
      </section>

      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-indigo-400" />
              <CardTitle className="text-white">{caseData.client}</CardTitle>
            </div>
            <CardDescription className="text-zinc-400">
              {caseData.industry}
            </CardDescription>
          </div>
          <Badge className="w-fit bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
            Enterprise
          </Badge>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="rounded-xl bg-zinc-800/50 p-6 border border-zinc-700/50">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-400" />
              {caseData.challenge.title}
            </h3>
            <ul className="space-y-2">
              {caseData.challenge.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-zinc-400"
                >
                  <span className="text-red-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-indigo-400" />
              {caseData.solution.title}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {caseData.solution.steps.map((step, idx) => (
                <Card key={idx} className="bg-zinc-800/50 border-zinc-700/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-indigo-500/10 p-1.5">
                        <step.icon className="h-4 w-4 text-indigo-400" />
                      </div>
                      <CardTitle className="text-base text-white">
                        {step.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-zinc-400">
                      {step.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {step.details.map((detail, didx) => (
                        <li
                          key={didx}
                          className="flex items-start gap-2 text-zinc-400"
                        >
                          <span className="text-indigo-400 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-indigo-950/50 to-violet-950/50 p-6 border border-indigo-500/20">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              {caseData.results.title}
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {caseData.results.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 rounded-lg bg-zinc-900/50 border border-zinc-700/50"
                >
                  <div className="text-3xl font-bold text-indigo-400">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-zinc-800/30 p-6 border-l-4 border-indigo-500">
            <p className="text-zinc-300 italic leading-relaxed">
              "{caseData.testimonial.text}"
            </p>
            <p className="text-sm text-indigo-400 mt-2">
              — {caseData.testimonial.author}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">{caseData.cta.title}</h3>
            <p className="text-indigo-100 text-sm mt-1">{caseData.cta.desc}</p>
          </div>
          <Button
            variant="secondary"
            className="bg-white text-indigo-600 hover:bg-zinc-100"
            asChild
          >
            <Link href="/contact">
              {caseData.cta.button}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
