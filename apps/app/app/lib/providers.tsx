'use client'

import { useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { chains, wagmiConfig } from '@/app/lib/web3'
import { Theme } from '@radix-ui/themes'

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });


export function ClientProviders({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    return (
        <WagmiConfig config={wagmiConfig}>
            <Theme appearance="dark" grayColor="gray" accentColor="iris" scaling="100%" panelBackground="solid" radius="medium">
                {mounted && children}
            </Theme>
        </WagmiConfig>
    )
}