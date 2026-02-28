import { NextResponse } from "next/server";
import { getTokenFromRequest, getUserByToken } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const token = getTokenFromRequest(req);
  const user = await getUserByToken(token);

  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
