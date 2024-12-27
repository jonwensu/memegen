import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "i.imgur.com", protocol: "https" }],
  },
};

// eslint-disable-next-line import/no-default-export
export default nextConfig;
