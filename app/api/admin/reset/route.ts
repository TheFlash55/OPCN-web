import { NextResponse } from "next/server";
import { resetMockDb } from "@/lib/mock-db";
import { resetOnchainDb } from "@/lib/onchain-mock";

export const dynamic = "force-dynamic";

async function handleReset() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  const [db, onchain] = await Promise.all([resetMockDb(), resetOnchainDb()]);
  return NextResponse.json({
    success: true,
    db: {
      users: db.users.length,
      agents: db.agents.length,
      leads: db.leads.length,
      askRequests: db.askRequests.length,
      bounties: db.bounties.length,
    },
    onchain: {
      bindings: onchain.bindings.length,
      credentials: onchain.credentials.length,
      capsules: onchain.capsules.length,
    },
  });
}

export async function POST() {
  return handleReset();
}

export async function GET() {
  return handleReset();
}
