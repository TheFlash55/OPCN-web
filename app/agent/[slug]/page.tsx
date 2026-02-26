import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AgentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AgentDetailPage({ params }: AgentPageProps) {
  const { slug } = await params;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent: {slug}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Dynamic route placeholder.</CardContent>
    </Card>
  );
}