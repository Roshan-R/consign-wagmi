import { configureChains, createConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'


const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [
        jsonRpcProvider({
            rpc: () => ({
                http: "https://gateway.tenderly.co/public/polygon-mumbai"
            }),
        }),
    ],
)

export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
    ],
    publicClient,
    webSocketPublicClient,
})
