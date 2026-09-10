import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6", ...(process.env.DEV_ALLOWED_ORIGINS?.split(",").map(value => value.trim()).filter(Boolean) ?? [])],
  images: {
    deviceSizes: [480, 768, 1024, 1440, 1672, 1920, 2560, 3840],
    imageSizes: [320, 640],
    qualities: [90, 92, 94],
  },
};
export default nextConfig;
