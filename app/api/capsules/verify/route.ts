import { NextResponse } from "next/server";
import { getBindingByAgent, verifyCapsule } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { id?: string; agentSlug?: string };
  if (!body.id || !body.agentSlug) {
    return NextResponse.json({ message: "missing fields" }, { status: 400 });
  }

  const binding = await getBindingByAgent(body.agentSlug);
  if (!binding) {
    return NextResponse.json({ ok: false, reason: "binding_missing" });
  }

  const result = await verifyCapsule({ id: body.id, claimHash: binding.claimHash });
  return NextResponse.json(result);
}
