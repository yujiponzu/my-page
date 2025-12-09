import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages で Next.js を動かすための公式静的エクスポート
  output: "export",
  basePath: "/my-page",
  assetPrefix: "/my-page/",
};

export default nextConfig;
