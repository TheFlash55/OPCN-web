"use client";

import { Hero } from "@/components/home/Hero";
import { TrustLogos } from "@/components/home/TrustLogos";
import { Features } from "@/components/home/Features";
import { Stats } from "@/components/home/Stats";
import { Workflow } from "@/components/home/Workflow";
import { Testimonials } from "@/components/home/Testimonials";
import { EmailCTA } from "@/components/EmailCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Dark gradient with large title */}
      <Hero />

      {/* Trust Logos */}
      <TrustLogos />

      {/* Stats Counter */}
      <Stats />

      {/* Features Grid */}
      <Features />

      {/* Workflow Steps */}
      <Workflow />

      {/* Testimonials */}
      <Testimonials />

      {/* Email CTA */}
      <EmailCTA />
    </main>
  );
}
