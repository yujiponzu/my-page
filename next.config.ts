import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // GitHub Pages で Next.js を動かすための公式静的エクスポート
  output: "export",
  ...(isGithubPages
    ? {
        basePath: "/my-page",
        assetPrefix: "/my-page/",
      }
    : {}),
};

export default nextConfig;
