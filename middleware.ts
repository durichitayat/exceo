"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const isPlatformSubdomain = hostname.startsWith("platform.");
  const path = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-is-platform-subdomain", isPlatformSubdomain.toString());

  // Handle platform subdomain
  if (isPlatformSubdomain) {
    const response = NextResponse.rewrite(new URL(`/platform${path}`, request.url));
    response.headers.set("x-is-platform-subdomain", isPlatformSubdomain.toString());
    return response;
  }

  // Default behavior for www or no subdomain
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};