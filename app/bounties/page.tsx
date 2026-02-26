"use client";

import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BountiesPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{text.pages.bounties}</CardTitle>
        <Badge variant="secondary">Placeholder</Badge>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">No business logic in this stage.</CardContent>
    </Card>
  );
}
