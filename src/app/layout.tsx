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
      <head>
        <link
          href="https://unpkg.com/video.js@7/dist/video-js.min.css"
          rel="stylesheet"
        />

        <link
          href="https://unpkg.com/@videojs/themes@1/dist/city/index.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/@videojs/themes@1/dist/sea/index.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${font.className} antialiased`}>
        <UserLayout>{children}</UserLayout>
      </body>
      <FlyonuiScript />
    </html>
  );
}
