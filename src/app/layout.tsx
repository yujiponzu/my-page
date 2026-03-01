import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "植田雄士のホームページ",
  description:
    "植田雄士（Yuji Ueda）の研究ホームページ。大規模言語モデル（LLM）、エコーチェンバー、フィルターバブル、情報的健康に関する研究・業績を掲載。",
  verification: {
    google: "i8r0AE6jTHPJNCjz0T0osLhqUXsjnZH-MUQV5CK-zls",
  },
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
