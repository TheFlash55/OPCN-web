import { NextResponse } from "next/server";
import { listBindingsByAddress } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  if (!address) {
    return NextResponse.json({ bindings: [] });
  }

  return NextResponse.json({ bindings: await listBindingsByAddress(address) });
}
