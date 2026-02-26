"use client";

import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.pages.onboarding}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Placeholder page.</CardContent>
    </Card>
  );
}
