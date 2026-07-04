import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Space_Grotesk } from "next/font/google";

import { AppFrame } from "@/components/insider-threat/app-frame";
import { ScrollReveal } from "@/components/insider-threat/scroll-reveal";
import { StoreProvider } from "@/store/provider";

import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const headlineFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Intelligence Lab",
  description:
    "Corporate-style intelligence lab website built around live operational signals, research capabilities, and enterprise-grade analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headlineFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>
          <ScrollReveal />
          <AppFrame>{children}</AppFrame>
        </StoreProvider>
      </body>
    </html>
  );
}
