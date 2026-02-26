import type { Agent, AgentDraft, AskRequest, Bounty, Lead, Offer, User } from "@/types";

type DB = {
  users: User[];
  agents: Agent[];
  leads: Lead[];
  askRequests: AskRequest[];
  bounties: Bounty[];
  sessions: Record<string, string>;
};

const KEY = "__opcn_mock_db__";

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function slugify(input: string) {
  const core = input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return core ? `opc-${core.slice(0, 24)}` : `opc-${Math.random().toString(36).slice(2, 6)}`;
}

function defaultOffers(): Offer[] {
  return [
    { tier: "starter", price: 199, deliverables: ["Single page intro", "Basic lead form"], durationDays: 3 },
    { tier: "pro", price: 599, deliverables: ["Full landing page", "3 promo copies", "Lead handoff"], durationDays: 7 },
    { tier: "premium", price: 1299, deliverables: ["Strategy diagnosis", "Full funnel page", "Conversion optimization"], durationDays: 14 },
  ];
}

function seedBounties(createdAt: string): Bounty[] {
  return [
    {
      id: "bounty-001",
      title: "搭建 AI 咨询服务落地页",
      desc: "需要一个可发布的服务落地页，包含套餐和预约表单。",
      reward: 1200,
      tags: ["landing", "consulting"],
      createdAt,
      status: "open",
    },
    {
      id: "bounty-002",
      title: "制作三套投放文案",
      desc: "面向小红书、朋友圈、私聊的投放文案，要求可直接复制使用。",
      reward: 600,
      tags: ["copywriting", "growth"],
      createdAt,
      status: "open",
    },
    {
      id: "bounty-003",
      title: "线索表单与通知流程优化",
      desc: "优化表单字段和通知策略，减少无效线索。",
      reward: 900,
      tags: ["leads", "automation"],
      createdAt,
      status: "open",
    },
  ];
}

function seed(): DB {
  const createdAt = nowIso();
  const demoUser: User = {
    id: "user-demo",
    email: "demo@opcn.ai",
    password: "demo123",
    name: "Demo Founder",
    createdAt,
  };

  const demoAgent: Agent = {
    slug: "opc-growth-studio",
    ownerId: demoUser.id,
    displayName: "Growth Studio",
    headline: "把你的 Agent 打造成可成交的服务页",
    tags: ["增长", "获客", "自动化"],
    offers: defaultOffers(),
    deliveryNote: "交付包含页面发布、文案素材和线索流转建议。",
    published: true,
    rating: 4.8,
    calls: 128,
    createdAt,
    updatedAt: createdAt,
  };

  return {
    users: [demoUser],
    agents: [demoAgent],
    leads: [],
    askRequests: [],
    bounties: seedBounties(createdAt),
    sessions: { "token-demo": demoUser.id },
  };
}

function db(): DB {
  const g = globalThis as typeof globalThis & { [KEY]?: DB };
  if (!g[KEY]) {
    g[KEY] = seed();
  }
  return g[KEY] as DB;
}

export function getTokenFromRequest(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7);
  const xToken = req.headers.get("x-token");
  return xToken || null;
}

export function getUserByToken(token: string | null) {
  if (!token) return null;
  const store = db();
  const userId = store.sessions[token];
  if (!userId) return null;
  return store.users.find((u) => u.id === userId) || null;
}

export function signupUser(input: { email: string; password: string; name?: string }) {
  const store = db();
  const existed = store.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
  if (existed) return { error: "EMAIL_EXISTS" as const };

  const user: User = {
    id: uid("user"),
    email: input.email,
    password: input.password,
    name: input.name || input.email.split("@")[0],
    createdAt: nowIso(),
  };
  store.users.push(user);

  const token = `token-${uid("sess")}`;
  store.sessions[token] = user.id;
  return { user, token };
}

export function signinUser(input: { email: string; password: string }) {
  const store = db();
  const user = store.users.find(
    (u) => u.email.toLowerCase() === input.email.toLowerCase() && u.password === input.password
  );
  if (!user) return { error: "INVALID_CREDENTIALS" as const };

  const token = `token-${uid("sess")}`;
  store.sessions[token] = user.id;
  return { user, token };
}

export function upsertAgent(input: AgentDraft & { ownerId: string; slug?: string }) {
  const store = db();
  const ts = nowIso();
  const slug = input.slug || slugify(input.displayName);
  const idx = store.agents.findIndex((a) => a.slug === slug);

  if (idx >= 0) {
    const current = store.agents[idx];
    const next: Agent = {
      ...current,
      displayName: input.displayName,
      headline: input.headline,
      tags: input.tags,
      offers: input.offers,
      deliveryNote: input.deliveryNote,
      ownerId: input.ownerId,
      updatedAt: ts,
    };
    store.agents[idx] = next;
    return next;
  }

  const created: Agent = {
    slug,
    ownerId: input.ownerId,
    displayName: input.displayName,
    headline: input.headline,
    tags: input.tags,
    offers: input.offers,
    deliveryNote: input.deliveryNote,
    published: false,
    rating: Number((4 + Math.random() * 0.9).toFixed(1)),
    calls: Math.floor(Math.random() * 50),
    createdAt: ts,
    updatedAt: ts,
  };
  store.agents.push(created);
  return created;
}

export function publishAgent(input: { slug?: string; inviteCode?: string; ownerId?: string }) {
  const store = db();
  let agent: Agent | undefined;

  if (input.slug) {
    agent = store.agents.find((a) => a.slug === input.slug);
  }

  if (!agent && input.ownerId) {
    agent = [...store.agents].reverse().find((a) => a.ownerId === input.ownerId);
  }

  if (!agent) {
    const ownerId = input.ownerId || "user-demo";
    agent = upsertAgent({
      ownerId,
      displayName: "New Agent",
      headline: "你的新 Agent 页面",
      tags: ["服务"],
      offers: defaultOffers(),
      deliveryNote: "待完善",
    });
  }

  agent.published = true;
  agent.updatedAt = nowIso();

  const inviteCode = input.inviteCode || "BETA-0000";
  const shareUrl = `/agent/${agent.slug}?ref=${inviteCode}`;
  return { slug: agent.slug, shareUrl, agent };
}

export function listAgents(query: { q?: string; tag?: string; sort?: string }) {
  const q = (query.q || "").trim().toLowerCase();
  const tag = (query.tag || "").trim().toLowerCase();
  const sort = query.sort || "recommended";

  let rows = db().agents.filter((a) => a.published);

  if (q) {
    rows = rows.filter((a) => {
      return (
        a.displayName.toLowerCase().includes(q) ||
        a.headline.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }

  if (tag) {
    rows = rows.filter((a) => a.tags.some((t) => t.toLowerCase() === tag));
  }

  rows = [...rows].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === "rating") {
      return b.rating - a.rating;
    }
    if (sort === "hot") {
      return b.calls - a.calls;
    }
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.calls - a.calls;
  });

  return rows;
}

export function getAgentBySlug(slug: string) {
  return db().agents.find((a) => a.slug === slug) || null;
}

export function createLead(input: {
  agentSlug: string;
  name: string;
  contact: string;
  budgetRange: string;
  urgency: string;
  desc: string;
}) {
  const store = db();
  const agent = store.agents.find((a) => a.slug === input.agentSlug && a.published);
  if (!agent) return { error: "AGENT_NOT_FOUND" as const };

  const lead: Lead = {
    id: uid("lead"),
    ownerId: agent.ownerId,
    agentSlug: agent.slug,
    name: input.name,
    contact: input.contact,
    budgetRange: input.budgetRange,
    urgency: input.urgency,
    desc: input.desc,
    status: "new",
    createdAt: nowIso(),
  };

  agent.calls += 1;
  agent.updatedAt = nowIso();
  store.leads.push(lead);
  return { lead };
}

export function listLeadsByOwner(ownerId: string, status?: string) {
  let rows = db().leads.filter((l) => l.ownerId === ownerId);
  if (status && ["new", "processing", "closed"].includes(status)) {
    rows = rows.filter((l) => l.status === status);
  }
  return [...rows].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function countLeads(ownerId?: string) {
  if (!ownerId) return db().leads.length;
  return db().leads.filter((l) => l.ownerId === ownerId).length;
}

export function createAskRequest(input: {
  title: string;
  desc: string;
  budget: string;
  expectedDeliverable: string;
  tags: string[];
  contact: string;
}) {
  const store = db();
  const request: AskRequest = {
    id: uid("ask"),
    title: input.title,
    desc: input.desc,
    budget: input.budget,
    expectedDeliverable: input.expectedDeliverable,
    tags: input.tags,
    contact: input.contact,
    createdAt: nowIso(),
  };
  store.askRequests.push(request);
  return request;
}

export function listAskRequests() {
  return [...db().askRequests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function listBounties() {
  return [...db().bounties].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getBountyById(id: string) {
  return db().bounties.find((b) => b.id === id) || null;
}

export function claimBounty(input: { id: string; userId: string }) {
  const bounty = getBountyById(input.id);
  if (!bounty) return { error: "NOT_FOUND" as const };
  if (bounty.status !== "open") return { error: "ALREADY_CLAIMED" as const };

  bounty.status = "claimed";
  bounty.claimerId = input.userId;
  return { bounty };
}