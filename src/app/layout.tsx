import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FlyonuiScript from "@/components/FlyonuiScript";
import UserLayout from "@/components/UserLayout";

export const metadata: Metadata = {
  title: "Online kurslar",
  description: "",
};

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${font.className} antialiased`}>
        <UserLayout>{children}</UserLayout>
      </body>
      <FlyonuiScript />
    </html>
  );
}
