export type Locale = "zh" | "en";

export const dictionary = {
  en: {
    nav: {
      ask: "Ask",
      market: "Market",
      bounties: "Bounties",
      services: "Data Services",
      about: "About",
      cases: "Cases",
      contact: "Contact",
      signIn: "Sign in",
      signUp: "Sign up",
      light: "Light",
      dark: "Dark",
      language: "Language",
    },
    home: {
      title: "Enterprise Data Solutions for One-Person Companies",
      subtitle:
        "Providing OPCs with web data collection, analysis, and insights to drive business growth and policy research.",
      askCta: "Get Data Service Plan",
      marketCta: "Book Free Consultation",
      panel: "AcquisitionPanel placeholder",
    },
    acquisition: {
      title: "Customer Acquisition Hub",
      subtitle:
        "Three steps to turn your Agent into a shareable landing page with data services",
      step1Title: "Create Agent",
      step1DataService:
        "Configure as data collection tasks: competitor price monitoring, policy tracking, sentiment analysis",
      step2Title: "Publish Landing Page",
      step2DataService:
        "Embed data insights dashboard: industry trend reports, competitor analysis summaries",
      step3Title: "One-click Distribution",
      viewLeads: "View Leads",
      caseStudyTitle: "Success Stories",
      caseStudyDesc:
        "See how OPCs achieve XX% efficiency gains with Agent Network data automation",
      viewCases: "View Cases",
    },
    pages: {
      ask: "Ask",
      market: "Market",
      bounties: "Bounties",
      services: "Data Services",
      about: "About Us",
      cases: "Case Studies",
      contact: "Contact",
      signin: "Sign in",
      signup: "Sign up",
      onboarding: "Onboarding",
      leads: "Leads",
      agent: "Agent",
    },
  },
  zh: {
    nav: {
      ask: "提问",
      market: "市场",
      bounties: "悬赏",
      services: "数据服务",
      about: "关于我们",
      cases: "案例",
      contact: "联系我们",
      signIn: "登录",
      signUp: "注册",
      light: "浅色",
      dark: "深色",
      language: "语言",
    },
    home: {
      title: "一人公司数据解决方案，企业级交付",
      subtitle:
        "为OPC（一人公司）提供网络数据采集、分析、洞察服务，助力业务增长与政策研究。",
      askCta: "获取数据服务方案",
      marketCta: "预约免费咨询",
      panel: "AcquisitionPanel 占位",
    },
    acquisition: {
      title: "客源启动台",
      subtitle: "三步把 Agent 变成可分享的获客页，并接入数据服务",
      step1Title: "创建 Agent",
      step1DataService:
        "可配置为数据采集任务：竞品价格监控、政策动态追踪、舆情分析等",
      step2Title: "发布获客页",
      step2DataService:
        "可嵌入数据洞察看板：行业趋势报告、竞品分析摘要，吸引 B/G 端客户",
      step3Title: "一键投放",
      viewLeads: "查看线索",
      caseStudyTitle: "数据服务案例",
      caseStudyDesc: "某 OPC 用 Agent 网络实现数据自动化，效率提升 300%",
      viewCases: "查看案例",
    },
    pages: {
      ask: "提问",
      market: "市场",
      bounties: "悬赏",
      services: "数据服务",
      about: "关于我们",
      cases: "案例研究",
      contact: "联系我们",
      signin: "登录",
      signup: "注册",
      onboarding: "引导",
      leads: "线索",
      agent: "Agent",
    },
  },
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}
