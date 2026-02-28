import { NextResponse } from "next/server";
import type { OnchainBinding } from "@/types/onchain";
import { saveBinding } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<OnchainBinding>;

  if (!body.address || !body.chainId || !body.agentSlug || !body.claimHash || !body.signature || !body.createdAt || !body.status) {
    return NextResponse.json({ message: "missing fields" }, { status: 400 });
  }

  const binding = await saveBinding({
    address: body.address,
    chainId: body.chainId,
    agentSlug: body.agentSlug,
    claimHash: body.claimHash,
    signature: body.signature,
    createdAt: body.createdAt,
    status: body.status,
  });

  return NextResponse.json({ binding });
}
