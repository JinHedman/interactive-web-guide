import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output: 'export' — we target a long-running Node server (OSC My Apps)
  serverExternalPackages: ["shiki"],
};

export default nextConfig;
