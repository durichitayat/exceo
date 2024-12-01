/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Handle subdomain routing
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value:
              "platform.exceo.ai|platform.localhost:3000|platform-(?<branch>[^.]+).vercel.app",
          },
        ],
        destination: "/platform/:path*",
      },
    ];
  },

  // Add hostname support for development and security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Customize the build output
  output: "standalone",

  // Add image domains
  images: {
    domains: ["localhost", "platform.localhost", "your-production-domain.com"],
  },
};

// Use ES module export syntax
export default nextConfig;
