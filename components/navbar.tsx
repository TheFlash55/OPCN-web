"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Menu, X } from "lucide-react";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WalletMenu } from "@/components/wallet-menu";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/services", label: "数据服务" },
  { href: "/cases", label: "案例" },
  { href: "/about", label: "关于我们" },
  { href: "/contact", label: "联系我们" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-gray-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        {/* Logo + Tagline */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-400" />
            <span className="font-bold text-white text-lg">OPCN</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-medium border-l border-slate-600 pl-2 ml-1">
            智能数据基础设施
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-blue-400"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <WalletMenu />
          <Button
            asChild
            variant="ghost"
            className="hidden sm:inline-flex text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Link href="/signin">登录</Link>
          </Button>
          <Button
            asChild
            className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            <Link href="/signup">注册</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-300 hover:text-white hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-700/50 bg-gray-900">
          <nav className="flex flex-col py-4 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 px-4 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-slate-700/50 my-2 pt-2">
              <div className="flex items-center gap-2 px-4 py-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div className="grid grid-cols-2 gap-2 px-4 pt-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <Link href="/signin">登录</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/signup">注册</Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
