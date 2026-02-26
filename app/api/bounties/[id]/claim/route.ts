import { NextResponse } from "next/server";
import { claimBounty, getTokenFromRequest, getUserByToken } from "@/lib/mock-db";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Params) {
  const token = getTokenFromRequest(req);
  const user = getUserByToken(token);
  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const result = claimBounty({ id, userId: user.id });

  if ("error" in result) {
    if (result.error === "NOT_FOUND") {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "already claimed" }, { status: 409 });
  }

  return NextResponse.json({ success: true, bounty: result.bounty });
}