import { NextResponse } from "next/server";
import { getTokenFromRequest, getUserByToken, publishAgent } from "@/lib/mock-db";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { slug?: string; inviteCode?: string };
  const token = getTokenFromRequest(req);
  const user = getUserByToken(token);

  const result = publishAgent({
    slug: body.slug,
    inviteCode: body.inviteCode,
    ownerId: user?.id,
  });

  return NextResponse.json({ slug: result.slug, shareUrl: result.shareUrl });
}