"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WalletMenu } from "@/components/wallet-menu";

export function Navbar() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Bot className="h-5 w-5 text-primary" />
          <span>OPCN</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/ask">{text.nav.ask}</Link>
          <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/market">{text.nav.market}</Link>
          <Link className="text-sm text-muted-foreground transition hover:text-foreground" href="/bounties">{text.nav.bounties}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <WalletMenu />
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link href="/signin">{text.nav.signIn}</Link></Button>
          <Button asChild><Link href="/signup">{text.nav.signUp}</Link></Button>
        </div>
      </div>
    </header>
  );
}