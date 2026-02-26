import { NextResponse } from "next/server";
import { countLeads, getTokenFromRequest, getUserByToken } from "@/lib/mock-db";

export async function GET(req: Request) {
  const token = getTokenFromRequest(req);
  const user = getUserByToken(token);
  return NextResponse.json({ count: countLeads(user?.id) });
}