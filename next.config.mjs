/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["instagram.com", "facebook.com"],
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
        ],
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
