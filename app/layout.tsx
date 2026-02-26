import type { Metadata } from "next";
import { DynamicBackground } from "@/components/dynamic-background";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "OPCN Web",
  description: "Next.js skeleton for OPCN web frontend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="relative isolate min-h-screen overflow-x-clip">
            <DynamicBackground />
            <div className="relative z-10">
              <Navbar />
              <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>
            </div>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}