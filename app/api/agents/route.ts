import { NextResponse } from "next/server";
import { getTokenFromRequest, getUserByToken, listAgents, upsertAgent } from "@/lib/mock-db";
import type { AgentDraft } from "@/types";

export async function POST(req: Request) {
  const token = getTokenFromRequest(req);
  const user = getUserByToken(token);
  const ownerId = user?.id || "user-demo";

  const body = (await req.json().catch(() => ({}))) as Partial<AgentDraft>;
  if (!body.displayName || !body.headline || !body.offers || !body.deliveryNote) {
    return NextResponse.json({ message: "missing required fields" }, { status: 400 });
  }

  const agent = upsertAgent({
    ownerId,
    slug: body.slug,
    displayName: body.displayName,
    headline: body.headline,
    tags: body.tags || [],
    offers: body.offers,
    deliveryNote: body.deliveryNote,
  });

  return NextResponse.json({ agent });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const sort = searchParams.get("sort") || undefined;

  const agents = listAgents({ q, tag, sort });
  return NextResponse.json({ agents });
}