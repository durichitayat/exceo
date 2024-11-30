import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Utility function to get the hostname from a request
function getHostname(request: NextRequest) {
  // Get hostname (e.g. vercel.app, localhost:3000)
  const hostname = request.headers.get('host')

  // Only for preview deployments on Vercel
  const currentHost = 
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname?.replace(`.vercel.app`, '')
      : hostname?.replace(`:3000`, '')

  return currentHost
}

// Utility function to validate the subdomain
function getValidSubdomain(host: string | null) {
  let subdomain: string | null = null
  
  if (!host) {
    return subdomain
  }

  // Handle localhost or Vercel preview URLs
  if (host.includes('localhost') || host.includes('.vercel.app')) {
    // Extract subdomain from preview URL or localhost
    const candidate = host.split('.')[0]
    if (candidate && candidate !== 'localhost') {
      subdomain = candidate.includes('-') ? candidate.split('-')[0] : candidate
    }
    return subdomain
  }

  // For production domains (e.g. platform.exceo.ai)
  subdomain = host.split('.')[0]
  return subdomain
}

export function middleware(request: NextRequest) {
  const hostname = getHostname(request) ?? null
  const subdomain = getValidSubdomain(hostname)
  const path = request.nextUrl.pathname

  // Handle platform subdomain
  if (subdomain === 'platform') {
    return NextResponse.rewrite(new URL(`/platform${path}`, request.url))
  }

  // Default behavior for www or no subdomain
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}