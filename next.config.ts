import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.royalgangchambers.com",
        pathname: "/products/**", // Adjust the path to match your image URLs
      },
    ],
  },
};

export default nextConfig;
