"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { OnchainBinding, OnchainCredential } from "@/types/onchain";

type OnchainState = {
  bindings: OnchainBinding[];
  credentials: OnchainCredential[];
  verifiedShareEnabled: boolean;
  upsertBinding: (binding: OnchainBinding) => void;
  upsertCredential: (credential: OnchainCredential) => void;
  setVerifiedShareEnabled: (enabled: boolean) => void;
  getBindingByAgent: (slug: string) => OnchainBinding | undefined;
  getCredentialByAddress: (address: string) => OnchainCredential | undefined;
};

export const useOnchainStore = create<OnchainState>()(
  persist(
    (set, get) => ({
      bindings: [],
      credentials: [],
      verifiedShareEnabled: false,
      upsertBinding: (binding) =>
        set((state) => {
          const existing = state.bindings.find((b) => b.id === binding.id || (b.agentSlug === binding.agentSlug && b.address === binding.address));
          if (existing) {
            return { bindings: state.bindings.map((b) => (b === existing ? binding : b)) };
          }
          return { bindings: [binding, ...state.bindings] };
        }),
      upsertCredential: (credential) =>
        set((state) => {
          const existing = state.credentials.find((c) => c.address.toLowerCase() === credential.address.toLowerCase());
          if (existing) {
            return { credentials: state.credentials.map((c) => (c === existing ? credential : c)) };
          }
          return { credentials: [credential, ...state.credentials] };
        }),
      setVerifiedShareEnabled: (enabled) => set({ verifiedShareEnabled: enabled }),
      getBindingByAgent: (slug) => get().bindings.find((b) => b.agentSlug === slug),
      getCredentialByAddress: (address) => get().credentials.find((c) => c.address.toLowerCase() === address.toLowerCase()),
    }),
    {
      name: "opcn-onchain",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ bindings: s.bindings, credentials: s.credentials, verifiedShareEnabled: s.verifiedShareEnabled }),
    }
  )
);