import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import "./index.css";

import { App } from './App'
import { config } from './wagmi'

import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WagmiConfig config={config}>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <App />
        </WagmiConfig>
    </React.StrictMode>,
)
