import { NextResponse } from "next/server";
import { countLeads, getTokenFromRequest, getUserByToken } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = getTokenFromRequest(req);
  const user = await getUserByToken(token);
  return NextResponse.json({ count: await countLeads(user?.id) });
}
