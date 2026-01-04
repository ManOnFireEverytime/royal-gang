import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.royalgangchamber.com",
        pathname: "/products/**", // Adjust the path to match your image URLs
      },
    ],
    qualities: [100, 75],
  },
};

export default nextConfig;
