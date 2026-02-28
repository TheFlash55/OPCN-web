import { NextResponse } from "next/server";
import { getBindingByAgent } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "";

  if (!slug) {
    return NextResponse.json({ binding: null });
  }

  return NextResponse.json({ binding: await getBindingByAgent(slug) });
}
