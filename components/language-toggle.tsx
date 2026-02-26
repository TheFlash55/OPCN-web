"use client";

import { Languages } from "lucide-react";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const locale = useUIStore((state) => state.locale);
  const setLocale = useUIStore((state) => state.setLocale);
  const text = t(locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={text.nav.language}>
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => setLocale("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("zh")}>中文</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
