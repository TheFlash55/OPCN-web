"use client";

import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{text.pages.market}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="featured">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
          </TabsList>
          <TabsContent value="featured" className="mt-4 text-sm text-muted-foreground">
            Placeholder content.
          </TabsContent>
          <TabsContent value="latest" className="mt-4 text-sm text-muted-foreground">
            Placeholder content.
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
