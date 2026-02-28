import { NextResponse } from "next/server";
import { createAskRequest, listAskRequests } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    desc?: string;
    budget?: string;
    expectedDeliverable?: string;
    tags?: string[];
    contact?: string;
  };

  if (!body.title || !body.desc || !body.budget || !body.expectedDeliverable || !body.contact) {
    return NextResponse.json({ message: "missing required fields" }, { status: 400 });
  }

  const request = await createAskRequest({
    title: body.title,
    desc: body.desc,
    budget: body.budget,
    expectedDeliverable: body.expectedDeliverable,
    tags: body.tags || [],
    contact: body.contact,
  });

  return NextResponse.json({ requestId: request.id, request });
}

export async function GET() {
  return NextResponse.json({ requests: await listAskRequests() });
}
