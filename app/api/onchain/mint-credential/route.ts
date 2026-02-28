import { NextResponse } from "next/server";
import { getCredentialByAddress, mintCredential } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  if (!address) {
    return NextResponse.json({ credential: null });
  }

  return NextResponse.json({ credential: await getCredentialByAddress(address) });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { address?: string };
  if (!body.address) {
    return NextResponse.json({ message: "address required" }, { status: 400 });
  }

  const credential = (await getCredentialByAddress(body.address)) || (await mintCredential(body.address));
  return NextResponse.json({ tokenId: credential.tokenId, credential });
}
