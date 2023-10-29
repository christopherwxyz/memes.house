import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// Import necessary libraries and components
import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const inter = Inter({ subsets: ['latin'] })

// Configure wagmi
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
});


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WagmiConfig config={config}>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </WagmiConfig>
  )
}