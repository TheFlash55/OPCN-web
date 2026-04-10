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
        subtitle: "专业数据服务团队，为一人公司提供企业级数据解决方案",
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
            {
              title: "专注OPC",
              desc: "深刻理解一人公司的痛点：预算有限、需要快速见效、技术储备不足",
            },
            {
              title: "端到端服务",
              desc: "从需求分析、数据采集、清洗处理到洞察报告，一站式交付",
            },
            {
              title: "灵活交付",
              desc: "支持一次性项目、月度订阅、按量计费等多种合作模式",
            },
            {
              title: "技术赋能",
              desc: "不仅交付数据，更提供可复用的工具和方法论",
            },
          ],
        },
      }
    : {
        title: "About Us",
        subtitle:
          "Professional data services team providing enterprise-grade solutions for One-Person Companies",
        expertise: {
          title: "Our Expertise",
          items: [
            {
              icon: Briefcase,
              title: "8+ Years Data Engineering",
              desc: "Formerly at top-tier internet companies' data platform teams",
            },
            {
              icon: Database,
              title: "Large-scale Data Collection",
              desc: "Processing 10M+ data points daily across e-commerce, social, news domains",
            },
            {
              icon: LineChart,
              title: "Business Data Analytics",
              desc: "Data-driven decision support for 50+ companies, avg 40% efficiency gain",
            },
            {
              icon: Shield,
              title: "Compliant Data Practice",
              desc: "Deep understanding of Data Security Law and Personal Information Protection Law",
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
              title: "Visualization & BI",
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
                "AWS/GCP/Aliyun",
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
            {
              title: "OPC-Focused",
              desc: "Deep understanding of OPC pain points: limited budget, need quick results, lack tech resources",
            },
            {
              title: "End-to-End Service",
              desc: "One-stop delivery from requirement analysis, data collection, processing to insight reports",
            },
            {
              title: "Flexible Delivery",
              desc: "Support one-time projects, monthly subscriptions, pay-per-use models",
            },
            {
              title: "Tech Empowerment",
              desc: "Deliver not just data, but reusable tools and methodologies",
            },
          ],
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

      {/* Expertise */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            {content.expertise.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {content.expertise.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg border border-border/50"
              >
                <div className="p-2 rounded-md bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            {content.techStack.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.techStack.categories.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border/50">
                <h3 className="font-semibold mb-3 text-sm">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sidx) => (
                    <Badge key={sidx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Why Us */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            {content.whyUs.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {content.whyUs.items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
