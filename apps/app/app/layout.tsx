"use client";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Inter } from "next/font/google";

import { ClientProviders } from "./lib/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}