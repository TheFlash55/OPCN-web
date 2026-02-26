export type Locale = "zh" | "en";

export const dictionary = {
  en: {
    nav: {
      ask: "Ask",
      market: "Market",
      bounties: "Bounties",
      signIn: "Sign in",
      signUp: "Sign up",
      light: "Light",
      dark: "Dark",
      language: "Language",
    },
    home: {
      title: "Build your One Person Company with OPC Agent Network",
      subtitle: "A minimal Next.js skeleton for Ask, Market, Bounties and Agent routes.",
      askCta: "Go to Ask",
      marketCta: "Browse Market",
      panel: "AcquisitionPanel placeholder",
    },
    pages: {
      ask: "Ask",
      market: "Market",
      bounties: "Bounties",
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
      signIn: "登录",
      signUp: "注册",
      light: "浅色",
      dark: "深色",
      language: "语言",
    },
    home: {
      title: "用 OPC Agent 网络构建你的 One Person Company",
      subtitle: "一个最小可运行前端骨架，包含 Ask、Market、Bounties 和 Agent 路由。",
      askCta: "去提问",
      marketCta: "浏览市场",
      panel: "AcquisitionPanel 占位",
    },
    pages: {
      ask: "提问",
      market: "市场",
      bounties: "悬赏",
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
