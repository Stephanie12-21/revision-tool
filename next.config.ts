import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://localhost:3000", // ton frontend local
    "https://revision-tool-backend.onrender.com", // ton backend déployé
  ],
};

export default nextConfig;
