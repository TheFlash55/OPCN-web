"use client";

import { create } from "zustand";
import type { Locale } from "@/lib/i18n";

type UIState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useUIStore = create<UIState>((set) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
}));
