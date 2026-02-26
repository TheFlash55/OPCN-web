"use client";

import Link from "next/link";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import { AcquisitionPanel } from "@/components/AcquisitionPanel";

export default function HomePage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{text.home.title}</h1>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">{text.home.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/ask">{text.home.askCta}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/market">{text.home.marketCta}</Link>
          </Button>
        </div>
      </div>

      <AcquisitionPanel />
    </section>
  );
}