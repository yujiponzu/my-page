import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "植田雄士のホームページ",
  description: "Researcher homepage built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
