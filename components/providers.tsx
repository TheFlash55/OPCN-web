"use client";

import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/ui/use-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}