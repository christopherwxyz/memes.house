import { createWeb3Modal } from '@web3modal/wagmi/react'
import { configureChains, Connector, createConfig } from 'wagmi'
import {
	mainnet,
	optimism,
	base,
	baseGoerli,
} from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

// WalletConnect options
const projectId = `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`
const metadata = {
	name: 'memes house',
	description: 'only the best memes',
	url: 'https://memes.house',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const { chains, publicClient, webSocketPublicClient } = configureChains(
	// Support several networks
	[mainnet, optimism, base, baseGoerli],

	// Prefer Alchemy, then Infura, then fallback
	[
		// infuraProvider({ apiKey: `${process.env.NEXT_PUBLIC_INFURA_RPC_KEY}` }),
		alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_KEY}` }),
		publicProvider(),
	],
)

// Setup wallet connectors with many options
const connectors: Connector[] = [
	new WalletConnectConnector({
		chains,
		options: {
			projectId,
			showQrModal: false,
			metadata,
		},
	}),
	new InjectedConnector({
		chains,
		options: {
			name: 'Browser Wallet',
			shimDisconnect: true,
		},
	}),
	// new LedgerConnector({
	// 	chains,
	// 	options: {
	// 		projectId: `${process.env.NEXT_PUBLIC_LEDGER_PROJECT_ID}`,
	// 	},
	// }),
	new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
]

// Stitch together the wagmi config
export const wagmiConfig = createConfig({
	autoConnect: false,
	connectors,
	publicClient,
	webSocketPublicClient,
})

// Create WalletConnect modal
export const usingWalletcConnect: boolean = !!projectId
if (usingWalletcConnect) {
	const defaultChain = baseGoerli
	createWeb3Modal({ wagmiConfig, projectId, chains, defaultChain })
}
