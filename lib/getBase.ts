export function getBaseUrl() {
    
    if (process.env.VERCEL_URL) {
      // reference for vercel.com
      return process.env.VERCEL_URL
    }
  
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      // reference for custom domain
      return process.env.NEXT_PUBLIC_SITE_URL;
    }
  
    // assume localhost
    return `localhost:${process.env.PORT ?? 3000}`;
  }