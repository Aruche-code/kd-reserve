import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import TosterContext from "./context/TosterContext";
import AuthContext from "./context/AuthContext";

export const metadata: Metadata = {
  title: "KD Reserve App",
  description: "Generated by kd reserve app",
};

const font = Noto_Sans_JP({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <AuthContext>
          <TosterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
