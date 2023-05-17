import { configureChains, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'



const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [
        jsonRpcProvider({
            rpc: (chain) => ({ http: `https://74a7-2406-8800-81-88ca-8c65-ccd6-2d6c-c429.ngrok-free.app` })
            ,
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
