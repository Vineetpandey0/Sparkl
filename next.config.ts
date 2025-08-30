import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignores TS errors when building (e.g., on Vercel)
  },
};

export default nextConfig;
