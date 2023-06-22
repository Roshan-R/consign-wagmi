import { configureChains, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai], [publicProvider()]
)

export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
    ],
    publicClient,
    webSocketPublicClient,
})
