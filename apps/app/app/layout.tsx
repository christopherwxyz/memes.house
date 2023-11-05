"use client";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme appearance="dark" grayColor="gray" accentColor="iris" scaling="100%" panelBackground="solid" radius="medium">
          <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
        </Theme>
      </body>
    </html>
  );
}