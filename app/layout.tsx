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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <DynamicBackground />
          <Navbar />
          <main className="w-full">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
