export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
};

export type OfferTier = "starter" | "pro" | "premium";

export type Offer = {
  tier: OfferTier;
  price: number;
  deliverables: string[];
  durationDays: number;
};

export type Agent = {
  slug: string;
  ownerId: string;
  displayName: string;
  headline: string;
  tags: string[];
  offers: Offer[];
  deliveryNote: string;
  published: boolean;
  rating: number;
  calls: number;
  createdAt: string;
  updatedAt: string;
};

export type LeadStatus = "new" | "processing" | "closed";

export type Lead = {
  id: string;
  ownerId: string;
  agentSlug: string;
  name: string;
  contact: string;
  budgetRange: string;
  urgency: string;
  desc: string;
  status: LeadStatus;
  createdAt: string;
};

export type AgentDraft = {
  slug?: string;
  displayName: string;
  headline: string;
  tags: string[];
  offers: Offer[];
  deliveryNote: string;
};

export type AskRequest = {
  id: string;
  title: string;
  desc: string;
  budget: string;
  expectedDeliverable: string;
  tags: string[];
  contact: string;
  createdAt: string;
};

export type BountyStatus = "open" | "claimed" | "closed";

export type Bounty = {
  id: string;
  title: string;
  desc: string;
  reward: number;
  tags: string[];
  createdAt: string;
  status: BountyStatus;
  claimerId?: string;
};