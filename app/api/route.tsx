// Example API route that classifies an email as spam or not

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  // Simple spam classification logic (placeholder)
  const isSpam = email.includes("spam");

  return NextResponse.json({ spam: isSpam });
}
