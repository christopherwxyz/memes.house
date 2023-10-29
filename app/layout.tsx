"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import wagmiConfig from "@/app/lib/wagmiConfig";
import { optimism, mainnet } from "wagmi/chains";

const inter = Inter({ subsets: ["latin"] });

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const chains = [mainnet, optimism];

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
      </body>
    </html>
  );
}
