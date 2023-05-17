import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Link } from "react-router-dom";

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

function Navbar() {

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const connector = new MetaMaskConnector()

    const [addr, setAddr] = useState<`0x${string}`>();
    const [isMultisig, setisMultiSig] = useState<boolean>();
    const { address, isConnected } = useAccount();

    const { disconnect } = useDisconnect();

    function handleClick() {
        isConnected ? disconnect() : connect({ connector })
    }


    useEffect(() => {
        setAddr(address)
        setisMultiSig(true)
    }, [address])

    return (
        <div className="bg-main">
            <header className="z-50 flex w-full flex-wrap text-sm dark:bg-gray-800 sm:flex-nowrap sm:justify-start">
                <nav className="w-full sm:flex sm:items-center sm:justify-between" aria-label="Global">
                    <a className="flex-none bg-pp py-9 pr-9 pl-3 font-roboto text-3xl border-l-0 border-[4px] border-black" href="/">Consign</a>
                    <div className="mt-5 flex flex-row items-center gap-7 sm:mt-0 sm:justify-end sm:pl-5">
                        {addr
                            ?
                            <>
                                {isMultisig ?
                                    <Link className="font-medium font-roboto text-xl text-black hover:underline" to="/issue">Issue</Link> : <></>}
                                <Link className="font-medium font-roboto text-xl text-black hover:underline" to="/profile">Profile</Link>
                                <Link className="font-medium font-roboto text-xl text-black hover:underline" to="/wallet">Wallet</Link>
                                <Link className="font-medium font-roboto text-xl text-black hover:underline" to="/dashboard">Dashboard</Link>
                            </>
                            : <></>}
                        <button onClick={handleClick} className="text-xl font-roboto font-bold mr-14 bg-peachh p-3 border-t-2 border-l-2 border-r-4 border-b-4 hover:border-b-8 border-black">
                            {addr
                                ? `Connected: ${addr.slice(0, 7) + '..'}`
                                : "Connect Wallet"}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar

