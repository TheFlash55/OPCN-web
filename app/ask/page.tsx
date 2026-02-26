"use client";

import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AskPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.pages.ask}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Question input placeholder" disabled />
      </CardContent>
    </Card>
  );
}
