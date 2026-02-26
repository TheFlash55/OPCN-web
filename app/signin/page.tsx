"use client";

import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{text.pages.signin}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Email" disabled />
        <Input placeholder="Password" type="password" disabled />
        <Button className="w-full" disabled>
          {text.pages.signin}
        </Button>
      </CardContent>
    </Card>
  );
}
