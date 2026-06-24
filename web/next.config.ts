import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/creator/dashboard",
        permanent: false,
      },
      {
        source: "/campaigns",
        destination: "/creator/campaigns",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
