"use client";

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
  CheckCircle2,
  Globe,
  FileJson,
  LineChart,
  Server,
  Lock,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const content = {
    hero: {
      title: "企业级数据服务解决方案",
      subtitle:
        "DNN 为 OPC（一人公司）提供企业级数据采集、处理与洞察服务，驱动商业决策",
      cta: "立即咨询",
    },
    collection: {
      title: "数据采集服务",
      subtitle:
        "智能数据采集，7×24小时不间断监控，覆盖竞品、政策、舆情等多场景",
      scenarios: [
        {
          icon: Globe,
          title: "竞品监控",
          desc: "实时追踪竞品价格、促销活动、产品上新动态，助力市场决策",
        },
        {
          icon: FileJson,
          title: "政策追踪",
          desc: "自动抓取政府公告、行业政策、法规变化，把握政策风向",
        },
        {
          icon: LineChart,
          title: "舆情分析",
          desc: "社交媒体、新闻评论、用户反馈数据聚合，洞察用户心声",
        },
      ],
      tech: {
        title: "技术方案",
        desc: "DNN 采用云原生架构与先进 AI 技术，确保数据服务的高效与可靠",
        items: [
          "合规爬虫：遵循 robots.txt，控制请求频率，避免对目标站点造成压力",
          "API集成：支持 RESTful API、GraphQL 及各类开放平台数据接入",
          "反爬应对：智能代理轮换、请求头模拟、验证码识别（打码平台）",
          "数据质量：自动去重、异常检测、完整性校验，确保数据准确可靠",
        ],
      },
    },
    processing: {
      title: "数据处理服务",
      subtitle: "从原始数据到可用信息的完整流程，清洗、结构化、标注一站式处理",
      steps: [
        {
          title: "数据清洗",
          desc: "去噪、去重、格式标准化、缺失值处理，提升数据质量",
        },
        {
          title: "结构化处理",
          desc: "JSON/XML/CSV 转换、数据库建模、字段映射，构建标准化数据体系",
        },
        {
          title: "数据标注",
          desc: "分类标注、实体识别、情感分析、质量审核，为 AI 训练提供高质量数据",
        },
      ],
      tools:
        "基于 Python Pandas、Scrapy、BeautifulSoup、Spark 等成熟工具链，支持海量数据处理",
    },
    insights: {
      title: "数据洞察服务",
      subtitle:
        "将数据转化为可执行的决策建议，自动生成报告、趋势分析、决策支持",
      features: [
        {
          title: "报告生成",
          desc: "自动生成周报/月报，包含趋势分析、异常预警、竞品对比，一目了然",
        },
        {
          title: "趋势分析",
          desc: "时间序列分析、预测模型、市场热度追踪，把握市场脉搏",
        },
        {
          title: "决策建议",
          desc: "基于数据的定价建议、投放策略、产品优化方向，科学指导业务决策",
        },
      ],
      demo: {
        title: "样本报告",
        desc: "下载示例数据洞察报告，了解交付物质量与专业水准",
      },
    },
    compliance: {
      title: "合规与安全",
      subtitle: "G端客户重点关注的数据合规保障，确保数据采集与处理合法合规",
      items: [
        {
          icon: FileCheck,
          title: "数据来源",
          desc: "仅采集公开可访问数据，不涉及个人隐私信息，源头合规",
        },
        {
          icon: Lock,
          title: "匿名化处理",
          desc: "敏感信息脱敏、用户标识去关联化，保护数据隐私",
        },
        {
          icon: ShieldCheck,
          title: "法律遵循",
          desc: "遵循《数据安全法》《个人信息保护法》等法规要求，合法合规经营",
        },
        {
          icon: Server,
          title: "安全存储",
          desc: "数据加密存储、访问日志审计、定期安全扫描，全方位数据安全保障",
        },
      ],
    },
    cta: {
      title: "开启企业级数据服务",
      subtitle: "专业团队一对一服务，定制化解决方案满足您的业务需求",
      button: "立即咨询",
    },
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-gray-900">
          {content.hero.title}
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          {content.hero.subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          <Link href="/contact">{content.hero.cta}</Link>
        </Button>
      </section>

      {/* Services Tabs */}
      <Tabs defaultValue="collection" className="w-full">
        <TabsList className="w-full flex flex-nowrap overflow-x-auto sm:grid sm:grid-cols-4 gap-1 sm:gap-0 bg-gray-100 p-1 rounded-lg h-auto">
          <TabsTrigger
            value="collection"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md whitespace-nowrap flex-shrink-0 transition-all"
          >
            <Database className="h-4 w-4" />
            <span>数据采集服务</span>
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md whitespace-nowrap flex-shrink-0 transition-all"
          >
            <Settings className="h-4 w-4" />
            <span>数据处理服务</span>
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md whitespace-nowrap flex-shrink-0 transition-all"
          >
            <BarChart3 className="h-4 w-4" />
            <span>数据洞察服务</span>
          </TabsTrigger>
          <TabsTrigger
            value="compliance"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md whitespace-nowrap flex-shrink-0 transition-all"
          >
            <Shield className="h-4 w-4" />
            <span>合规与安全</span>
          </TabsTrigger>
        </TabsList>

        {/* Collection Tab */}
        <TabsContent value="collection" className="space-y-6 mt-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {content.collection.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {content.collection.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenarios */}
              <div className="grid gap-4 md:grid-cols-3">
                {content.collection.scenarios.map((item, idx) => (
                  <Card
                    key={idx}
                    className="border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <CardContent className="pt-6">
                      <item.icon className="h-8 w-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold mb-1 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Tech Stack */}
              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-base text-gray-900">
                    {content.collection.tech.title}
                  </CardTitle>
                  <CardDescription>
                    {content.collection.tech.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.collection.tech.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-gray-700">{item}</span>
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
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {content.processing.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {content.processing.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Process Steps */}
              <div className="grid gap-4 md:grid-cols-3">
                {content.processing.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <Card className="border border-gray-200 h-full hover:border-blue-300 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h3 className="font-semibold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </CardContent>
                    </Card>
                    {idx < content.processing.steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
              {/* Tools */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <Settings className="h-4 w-4 text-blue-600" />
                <span>{content.processing.tools}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6 mt-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {content.insights.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {content.insights.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="grid gap-4 md:grid-cols-3">
                {content.insights.features.map((feature, idx) => (
                  <Card
                    key={idx}
                    className="border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {/* Sample Report */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold mb-1 text-gray-900">
                      {content.insights.demo.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {content.insights.demo.desc}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4" />
                    下载 PDF
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6 mt-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                {content.compliance.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {content.compliance.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {content.compliance.items.map((item, idx) => (
                  <Card
                    key={idx}
                    className="border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="bg-blue-600 text-white border-0">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{content.cta.title}</h2>
            <p className="opacity-90">{content.cta.subtitle}</p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
          >
            <Link href="/contact">{content.cta.button}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
