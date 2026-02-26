"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AcquisitionState = {
  hasDraftAgent: boolean;
  publishedSlug: string | null;
  shareUrl: string | null;
  leadCount: number;
  inviteCode: string;
  setHasDraftAgent: (value: boolean) => void;
  setPublished: (slug: string, shareUrl: string) => void;
  setLeadCount: (count: number) => void;
  resetAcquisition: () => void;
};

function generateInviteCode() {
  const token = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BETA-${token}`;
}

export const useAcquisitionStore = create<AcquisitionState>()(
  persist(
    (set) => ({
      hasDraftAgent: false,
      publishedSlug: null,
      shareUrl: null,
      leadCount: 0,
      inviteCode: generateInviteCode(),
      setHasDraftAgent: (value) => set({ hasDraftAgent: value }),
      setPublished: (slug, shareUrl) => set({ publishedSlug: slug, shareUrl }),
      setLeadCount: (count) => set({ leadCount: count }),
      resetAcquisition: () =>
        set({
          hasDraftAgent: false,
          publishedSlug: null,
          shareUrl: null,
          leadCount: 0,
          inviteCode: generateInviteCode(),
        }),
    }),
    {
      name: "opcn-acquisition",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        hasDraftAgent: state.hasDraftAgent,
        publishedSlug: state.publishedSlug,
        shareUrl: state.shareUrl,
        leadCount: state.leadCount,
        inviteCode: state.inviteCode,
      }),
    }
  )
);