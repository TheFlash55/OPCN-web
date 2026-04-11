"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Code2,
  LineChart,
  Shield,
  Server,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";

export default function AboutPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);
  const isZh = locale === "zh";

  const content = isZh
    ? {
        title: "关于我们",
        subtitle: "企业级智能数据基础设施提供商",
        expertise: {
          title: "专业背景",
          items: [
            {
              icon: Briefcase,
              title: "8年+ 数据工程经验",
              desc: "曾服务于头部互联网公司数据平台部门",
            },
            {
              icon: Database,
              title: "大规模数据采集",
              desc: "日均处理千万级数据点，覆盖电商、社交、新闻等多领域",
            },
            {
              icon: LineChart,
              title: "商业数据分析",
              desc: "为50+ 企业提供数据驱动决策支持，平均提升运营效率40%",
            },
            {
              icon: Shield,
              title: "合规数据实践",
              desc: "深度理解《数据安全法》《个人信息保护法》，确保数据合规",
            },
          ],
        },
        techStack: {
          title: "技术栈",
          categories: [
            {
              title: "数据采集",
              skills: [
                "Scrapy",
                "Playwright",
                "Selenium",
                "Requests",
                "aiohttp",
                "Charles/Fiddler",
              ],
            },
            {
              title: "数据处理",
              skills: ["Pandas", "NumPy", "Polars", "DuckDB", "Spark", "dbt"],
            },
            {
              title: "数据存储",
              skills: [
                "PostgreSQL",
                "ClickHouse",
                "MongoDB",
                "Redis",
                "Elasticsearch",
              ],
            },
            {
              title: "可视化 & BI",
              skills: [
                "Streamlit",
                "Plotly",
                "Apache Superset",
                "Metabase",
                "Grafana",
              ],
            },
            {
              title: "云 & DevOps",
              skills: [
                "AWS/GCP/阿里云",
                "Docker",
                "K8s",
                "Airflow",
                "GitHub Actions",
              ],
            },
          ],
        },
        whyUs: {
          title: "为什么选择我们",
          items: [
            "理解一人公司的资源约束，提供高性价比方案",
            "从需求分析到交付运维的全流程服务",
            "代码开源、文档完善，降低 vendor lock-in 风险",
            "灵活的付费模式：项目制 / 订阅制 / 效果付费",
          ],
        },
      }
    : {
        title: "About Us",
        subtitle: "Enterprise-grade Intelligent Data Infrastructure Provider",
        expertise: {
          title: "Expertise",
          items: [
            {
              icon: Briefcase,
              title: "8+ Years Data Engineering",
              desc: "Former data platform teams at top internet companies",
            },
            {
              icon: Database,
              title: "Large-scale Data Collection",
              desc: "Process tens of millions of data points daily across e-commerce, social, news",
            },
            {
              icon: LineChart,
              title: "Business Analytics",
              desc: "Helped 50+ companies with data-driven decisions, 40% avg efficiency gain",
            },
            {
              icon: Shield,
              title: "Compliance",
              desc: "Deep understanding of data security and privacy regulations",
            },
          ],
        },
        techStack: {
          title: "Tech Stack",
          categories: [
            {
              title: "Data Collection",
              skills: [
                "Scrapy",
                "Playwright",
                "Selenium",
                "Requests",
                "aiohttp",
                "Charles/Fiddler",
              ],
            },
            {
              title: "Data Processing",
              skills: ["Pandas", "NumPy", "Polars", "DuckDB", "Spark", "dbt"],
            },
            {
              title: "Data Storage",
              skills: [
                "PostgreSQL",
                "ClickHouse",
                "MongoDB",
                "Redis",
                "Elasticsearch",
              ],
            },
            {
              title: "Visualization",
              skills: [
                "Streamlit",
                "Plotly",
                "Apache Superset",
                "Metabase",
                "Grafana",
              ],
            },
            {
              title: "Cloud & DevOps",
              skills: [
                "AWS/GCP/AliCloud",
                "Docker",
                "K8s",
                "Airflow",
                "GitHub Actions",
              ],
            },
          ],
        },
        whyUs: {
          title: "Why Choose Us",
          items: [
            "Understand resource constraints of one-person companies",
            "End-to-end service from analysis to delivery",
            "Open source code, comprehensive documentation",
            "Flexible pricing: project-based, subscription, or performance-based",
          ],
        },
      };

  return (
    <div className="space-y-8 min-h-screen">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {content.title}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">{content.subtitle}</p>
      </section>

      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            {content.expertise.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {content.expertise.items.map((item, idx) => (
              <Card key={idx} className="bg-zinc-800/50 border-zinc-700/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-indigo-500/10 p-2">
                      <item.icon className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Code2 className="h-5 w-5 text-indigo-400" />
            {content.techStack.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.techStack.categories.map((cat, idx) => (
              <Card key={idx} className="bg-zinc-800/50 border-zinc-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-white">
                    {cat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sidx) => (
                      <Badge
                        key={sidx}
                        variant="secondary"
                        className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Award className="h-5 w-5 text-indigo-400" />
            {content.whyUs.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {content.whyUs.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-zinc-300">
                <span className="text-indigo-400 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
