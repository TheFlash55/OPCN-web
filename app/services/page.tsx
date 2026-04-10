"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Database,
  Settings,
  BarChart3,
  Shield,
  Download,
  ExternalLink,
  CheckCircle2,
  Globe,
  FileJson,
  LineChart,
} from "lucide-react";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import Link from "next/link";

export default function ServicesPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);
  const isZh = locale === "zh";

  // Service content based on locale
  const content = isZh
    ? {
        hero: {
          title: "专业数据服务",
          subtitle:
            "为OPC（一人公司）提供全流程数据解决方案，从采集到洞察，助力商业决策",
          cta: "预约咨询",
        },
        collection: {
          title: "数据采集服务",
          subtitle: "覆盖多场景的专业数据采集能力",
          scenarios: [
            {
              icon: Globe,
              title: "竞品监控",
              desc: "实时追踪竞品价格、促销活动、产品上新动态",
            },
            {
              icon: FileJson,
              title: "政策追踪",
              desc: "自动抓取政府公告、行业政策、法规变化",
            },
            {
              icon: LineChart,
              title: "舆情分析",
              desc: "社交媒体、新闻评论、用户反馈数据聚合",
            },
          ],
          tech: {
            title: "技术方案",
            items: [
              "合规爬虫：遵循 robots.txt，控制请求频率，避免对目标站点造成压力",
              "API集成：支持 RESTful API、GraphQL 及各类开放平台数据接入",
              "反爬应对：智能代理轮换、请求头模拟、验证码识别（打码平台）",
              "数据质量：自动去重、异常检测、完整性校验",
            ],
          },
        },
        processing: {
          title: "数据处理服务",
          subtitle: "从原始数据到可用信息的完整流程",
          steps: [
            { title: "数据清洗", desc: "去噪、去重、格式标准化、缺失值处理" },
            {
              title: "结构化处理",
              desc: "JSON/XML/CSV 转换、数据库建模、字段映射",
            },
            {
              title: "数据标注",
              desc: "分类标注、实体识别、情感分析、质量审核",
            },
          ],
          tools: "基于 Python Pandas、Scrapy、BeautifulSoup 等成熟工具链",
        },
        insights: {
          title: "数据洞察服务",
          subtitle: "将数据转化为可执行的决策建议",
          features: [
            {
              title: "报告生成",
              desc: "自动生成周报/月报，包含趋势分析、异常预警、竞品对比",
            },
            { title: "趋势分析", desc: "时间序列分析、预测模型、市场热度追踪" },
            {
              title: "决策建议",
              desc: "基于数据的定价建议、投放策略、产品优化方向",
            },
          ],
          demo: {
            title: "样本报告",
            desc: "下载示例数据洞察报告，了解交付物质量",
          },
        },
        compliance: {
          title: "合规与安全",
          subtitle: "G端客户重点关注的数据合规保障",
          items: [
            {
              title: "数据来源",
              desc: "仅采集公开可访问数据，不涉及个人隐私信息",
            },
            { title: "匿名化处理", desc: "敏感信息脱敏、用户标识去关联化" },
            {
              title: "法律遵循",
              desc: "遵循《数据安全法》《个人信息保护法》等法规要求",
            },
            {
              title: "安全存储",
              desc: "数据加密存储、访问日志审计、定期安全扫描",
            },
          ],
        },
        cta: {
          title: "开始您的数据之旅",
          subtitle: "免费需求评估，定制化解决方案",
          button: "立即咨询",
        },
      }
    : {
        hero: {
          title: "Professional Data Services",
          subtitle:
            "End-to-end data solutions for One-Person Companies, from collection to insights",
          cta: "Book Consultation",
        },
        collection: {
          title: "Data Collection",
          subtitle:
            "Professional data collection capabilities covering multiple scenarios",
          scenarios: [
            {
              icon: Globe,
              title: "Competitor Monitoring",
              desc: "Real-time tracking of competitor pricing, promotions, and product launches",
            },
            {
              icon: FileJson,
              title: "Policy Tracking",
              desc: "Automatic capture of government announcements, industry policies, and regulatory changes",
            },
            {
              icon: LineChart,
              title: "Sentiment Analysis",
              desc: "Aggregation of social media, news comments, and user feedback data",
            },
          ],
          tech: {
            title: "Technical Solutions",
            items: [
              "Compliant Crawling: Respects robots.txt, controls request frequency, avoids server stress",
              "API Integration: Supports RESTful API, GraphQL, and various open platform data access",
              "Anti-detection: Intelligent proxy rotation, header simulation, CAPTCHA solving",
              "Data Quality: Automatic deduplication, anomaly detection, completeness validation",
            ],
          },
        },
        processing: {
          title: "Data Processing",
          subtitle: "Complete pipeline from raw data to actionable information",
          steps: [
            {
              title: "Data Cleaning",
              desc: "Noise removal, deduplication, format standardization, missing value handling",
            },
            {
              title: "Structuring",
              desc: "JSON/XML/CSV conversion, database modeling, field mapping",
            },
            {
              title: "Data Labeling",
              desc: "Classification, entity recognition, sentiment analysis, quality review",
            },
          ],
          tools:
            "Built on mature Python toolchains: Pandas, Scrapy, BeautifulSoup",
        },
        insights: {
          title: "Data Insights",
          subtitle: "Transform data into executable decision recommendations",
          features: [
            {
              title: "Report Generation",
              desc: "Auto-generated weekly/monthly reports with trend analysis and competitor comparison",
            },
            {
              title: "Trend Analysis",
              desc: "Time series analysis, predictive modeling, market heat tracking",
            },
            {
              title: "Decision Support",
              desc: "Data-based pricing suggestions, marketing strategies, product optimization",
            },
          ],
          demo: {
            title: "Sample Report",
            desc: "Download a sample data insights report to see deliverable quality",
          },
        },
        compliance: {
          title: "Compliance & Security",
          subtitle:
            "Data compliance assurance for government and enterprise clients",
          items: [
            {
              title: "Data Sources",
              desc: "Only collects publicly accessible data, no personal privacy information involved",
            },
            {
              title: "Anonymization",
              desc: "Sensitive information masking, user identifier disassociation",
            },
            {
              title: "Legal Compliance",
              desc: "Complies with Data Security Law, Personal Information Protection Law, etc.",
            },
            {
              title: "Secure Storage",
              desc: "Encrypted data storage, access log auditing, regular security scanning",
            },
          ],
        },
        cta: {
          title: "Start Your Data Journey",
          subtitle: "Free needs assessment and customized solutions",
          button: "Contact Us",
        },
      };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          {content.hero.title}
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          {content.hero.subtitle}
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/ask">{content.hero.cta}</Link>
        </Button>
      </section>

      {/* Services Tabs */}
      <Tabs defaultValue="collection" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="collection" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">{content.collection.title}</span>
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">{content.processing.title}</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">{content.insights.title}</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{content.compliance.title}</span>
          </TabsTrigger>
        </TabsList>

        {/* Collection Tab */}
        <TabsContent value="collection" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{content.collection.title}</CardTitle>
              <CardDescription>{content.collection.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenarios */}
              <div className="grid gap-4 md:grid-cols-3">
                {content.collection.scenarios.map((item, idx) => (
                  <Card key={idx} className="border border-border/50">
                    <CardContent className="pt-6">
                      <item.icon className="h-8 w-8 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Tech Stack */}
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-base">
                    {content.collection.tech.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.collection.tech.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{content.processing.title}</CardTitle>
              <CardDescription>{content.processing.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Process Steps */}
              <div className="grid gap-4 md:grid-cols-3">
                {content.processing.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <Card className="border border-border/50 h-full">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h3 className="font-semibold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.desc}
                        </p>
                      </CardContent>
                    </Card>
                    {idx < content.processing.steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-border" />
                    )}
                  </div>
                ))}
              </div>
              {/* Tools */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <Settings className="h-4 w-4" />
                <span>{content.processing.tools}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{content.insights.title}</CardTitle>
              <CardDescription>{content.insights.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="grid gap-4 md:grid-cols-3">
                {content.insights.features.map((feature, idx) => (
                  <Card key={idx} className="border border-border/50">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Sample Report */}
              <Card className="bg-muted/50">
                <CardContent className="flex items-center justify-between py-6">
                  <div>
                    <h3 className="font-semibold mb-1">
                      {content.insights.demo.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.insights.demo.desc}
                    </p>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    PDF
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{content.compliance.title}</CardTitle>
              <CardDescription>{content.compliance.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {content.compliance.items.map((item, idx) => (
                  <Card key={idx} className="border border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{content.cta.title}</h2>
            <p className="opacity-90">{content.cta.subtitle}</p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/ask">{content.cta.button}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
