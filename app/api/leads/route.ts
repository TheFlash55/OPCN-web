import { NextResponse } from "next/server";
import { countLeads, createLead, getTokenFromRequest, getUserByToken, listLeadsByOwner } from "@/lib/mock-db";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    agentSlug?: string;
    name?: string;
    contact?: string;
    budgetRange?: string;
    urgency?: string;
    desc?: string;
  };

  if (!body.agentSlug || !body.name || !body.contact) {
    return NextResponse.json({ message: "missing fields" }, { status: 400 });
  }

  const result = createLead({
    agentSlug: body.agentSlug,
    name: body.name,
    contact: body.contact,
    budgetRange: body.budgetRange || "未填写",
    urgency: body.urgency || "normal",
    desc: body.desc || "",
  });

  if ("error" in result) {
    return NextResponse.json({ message: "agent not found" }, { status: 404 });
  }

  return NextResponse.json({ lead: result.lead });
}

export async function GET(req: Request) {
  const token = getTokenFromRequest(req);
  const user = getUserByToken(token);
  if (!user) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const leads = listLeadsByOwner(user.id, status);
  return NextResponse.json({ leads, count: countLeads(user.id) });
}