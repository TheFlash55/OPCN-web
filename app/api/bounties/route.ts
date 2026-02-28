import { NextResponse } from "next/server";
import { listBounties } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ bounties: await listBounties() });
}
