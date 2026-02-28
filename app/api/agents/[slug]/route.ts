import { NextResponse } from "next/server";
import { getAgentBySlug } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  if (!agent || !agent.published) {
    return NextResponse.json({ message: "not found" }, { status: 404 });
  }

  return NextResponse.json({ agent });
}
