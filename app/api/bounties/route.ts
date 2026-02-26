import { NextResponse } from "next/server";
import { listBounties } from "@/lib/mock-db";

export async function GET() {
  return NextResponse.json({ bounties: listBounties() });
}