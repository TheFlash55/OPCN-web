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
              {
                value: "5min",
                label: "预警响应",
                desc: "竞品价格变动5分钟内推送通知",
              },
            ],
          },
          tech: {
            title: "使用技术",
            items: [
              "Scrapy + Playwright",
              "Pandas + Polars",
              "PostgreSQL + TimescaleDB",
              "Streamlit 报告看板",
              "企业微信机器人推送",
            ],
          },
          testimonial: {
            title: "客户反馈",
            quote:
              "以前每天早上第一件事就是挨个打开竞品页面查价格，现在只需要看一眼手机推送。上个月竞品突然降价，我们在10分钟内就跟进了，避免了销量大幅下滑。",
            author: "— 张先生，OPC创始人",
          },
        },
        cta: {
          title: "想获得同样的效果？",
          subtitle: "我们为您提供定制化的数据解决方案",
          button: "预约免费咨询",
        },
      }
    : {
        title: "Case Studies",
        subtitle:
          "Real client cases showcasing the complete flow from data collection to business decisions",
        case: {
          client: "Cross-border E-commerce OPC",
          industry: "E-commerce / 3C Digital",
          challenge: {
            title: "Challenge",
            items: [
              "Manually monitoring 5 major competitors' prices, spending 2-3 hours daily",
              "Missing competitor promotions led to 20% sales decline",
              "Unable to detect market trends early, causing inventory overstock",
              "No systematic competitor data, pricing decisions based on intuition",
            ],
          },
          solution: {
            title: "Solution",
            steps: [
              {
                icon: Database,
                title: "Data Collection",
                desc: "Deployed crawlers to monitor 15 competitor SKUs across Amazon, Taobao, JD platforms",
                details: [
                  "Price, inventory, promo info collected hourly",
                  "Review sentiment analysis to extract pain points",
                  "Playwright for rendering to capture dynamic content",
                ],
              },
              {
                icon: BarChart3,
                title: "Data Processing",
                desc: "Cleaned and structured data, built competitor price database",
                details: [
                  "Automatic anomaly detection and filtering",
                  "Price trend calculation (daily/weekly/monthly)",
                  "Auto-classification of promotion types",
                ],
              },
              {
                icon: FileText,
                title: "Insight Reports",
                desc: "Auto-generated competitor monitoring reports daily",
                details: [
                  "Price drop alerts (>5% change triggers notification)",
                  "Promotion timing analysis with recommendations",
                  "Market share estimation and trend forecasting",
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
                label: "Sales Boost",
                desc: "Timely promotion follow-up, capturing sales opportunities",
              },
              {
                value: "30%",
                label: "Inventory Optimized",
                desc: "Reduced overstock based on trend predictions",
              },
              {
                value: "5min",
                label: "Alert Response",
                desc: "Competitor price changes notified within 5 minutes",
              },
            ],
          },
          tech: {
            title: "Technologies Used",
            items: [
              "Scrapy + Playwright",
              "Pandas + Polars",
              "PostgreSQL + TimescaleDB",
              "Streamlit Dashboard",
              "WeChat Work Bot Push",
            ],
          },
          testimonial: {
            title: "Testimonial",
            quote:
              "I used to open every competitor's page every morning to check prices. Now I just glance at my phone notifications. Last month when a competitor suddenly dropped prices, we responded within 10 minutes and avoided a major sales drop.",
            author: "— Mr. Zhang, OPC Founder",
          },
        },
        cta: {
          title: "Want similar results?",
          subtitle: "We provide customized data solutions for your business",
          button: "Book Free Consultation",
        },
      };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {content.title}
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          {content.subtitle}
        </p>
      </section>

      {/* Main Case Study */}
      <Card className="border-primary/20">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <Badge variant="secondary">{content.case.industry}</Badge>
          </div>
          <CardTitle className="text-2xl">{content.case.client}</CardTitle>
          <CardDescription>
            {isZh
              ? "竞品价格监控与促销预警系统"
              : "Competitor Price Monitoring & Promotion Alert System"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          {/* Challenge */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              {content.case.challenge.title}
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {content.case.challenge.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/10"
                >
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Steps */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              {content.case.solution.title}
            </h3>
            <div className="space-y-4">
              {content.case.solution.steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <Card className="border border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-md bg-primary/10">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                              {idx + 1}
                            </span>
                            <h4 className="font-semibold">{step.title}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {step.desc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.details.map((detail, didx) => (
                              <Badge
                                key={didx}
                                variant="outline"
                                className="text-xs font-normal"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {detail}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {idx < content.case.solution.steps.length - 1 && (
                    <div className="hidden md:block absolute left-8 top-full h-4 w-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {content.case.results.title}
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              {content.case.results.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center p-4 rounded-lg bg-background/50"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="font-medium text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              {content.case.tech.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content.case.tech.items.map((item, idx) => (
                <Badge key={idx} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <Card className="bg-muted/30 border-muted">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {content.case.testimonial.title}
              </h4>
              <blockquote className="text-muted-foreground italic mb-3">
                "{content.case.testimonial.quote}"
              </blockquote>
              <p className="text-sm font-medium text-right">
                {content.case.testimonial.author}
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{content.cta.title}</h2>
            <p className="opacity-90">{content.cta.subtitle}</p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">{content.cta.button}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
