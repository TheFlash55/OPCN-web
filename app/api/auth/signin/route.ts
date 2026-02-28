import { NextResponse } from "next/server";
import { signinUser } from "@/lib/mock-db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { email?: string; password?: string };
  if (!body.email || !body.password) {
    return NextResponse.json({ message: "email and password required" }, { status: 400 });
  }

  const result = await signinUser({ email: body.email, password: body.password });
  if ("error" in result) {
    return NextResponse.json({ message: "invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    token: result.token,
    user: { id: result.user.id, email: result.user.email, name: result.user.name },
  });
}
