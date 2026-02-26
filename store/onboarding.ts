"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AgentDraft, Offer } from "@/types";

const defaultOffers: Offer[] = [
  { tier: "starter", price: 199, deliverables: ["基础页面"], durationDays: 3 },
  { tier: "pro", price: 599, deliverables: ["获客页", "投放文案"], durationDays: 7 },
  { tier: "premium", price: 1299, deliverables: ["全流程代运营"], durationDays: 14 },
];

type OnboardingState = {
  step: number;
  draft: AgentDraft;
  setStep: (step: number) => void;
  setBaseInfo: (payload: { displayName: string; headline: string; tags: string[] }) => void;
  updateOffer: (index: number, patch: Partial<Offer>) => void;
  setDeliveryNote: (note: string) => void;
  setSlug: (slug: string) => void;
  reset: () => void;
};

const initialDraft: AgentDraft = {
  displayName: "",
  headline: "",
  tags: [],
  offers: defaultOffers,
  deliveryNote: "",
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 0,
      draft: initialDraft,
      setStep: (step) => set({ step }),
      setBaseInfo: (payload) =>
        set((state) => ({
          draft: {
            ...state.draft,
            displayName: payload.displayName,
            headline: payload.headline,
            tags: payload.tags,
          },
        })),
      updateOffer: (index, patch) =>
        set((state) => ({
          draft: {
            ...state.draft,
            offers: state.draft.offers.map((offer, i) => (i === index ? { ...offer, ...patch } : offer)),
          },
        })),
      setDeliveryNote: (note) => set((state) => ({ draft: { ...state.draft, deliveryNote: note } })),
      setSlug: (slug) => set((state) => ({ draft: { ...state.draft, slug } })),
      reset: () => set({ step: 0, draft: initialDraft }),
    }),
    {
      name: "opcn-onboarding-draft",
      storage: createJSONStorage(() => localStorage),
    }
  )
);