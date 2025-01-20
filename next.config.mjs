/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["instagram.com", "facebook.com"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,

  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/izmit-diyetisyen",
        destination: "/?service=izmit",
      },
      {
        source: "/kocaeli-diyetisyen",
        destination: "/?service=kocaeli",
      },
      {
        source: "/online-diyet",
        destination: "/?service=online",
      },
    ];
  },

  experimental: {
    serverActions: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
