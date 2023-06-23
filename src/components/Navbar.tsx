import { useAccount, useConnect, useContractRead, useDisconnect } from "wagmi";
import { Link } from "react-router-dom";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useEffect } from "react";
import useConsignStore from "../stores/globalStore";
import MainFactory from "../../consign-contracts/abi/MainFactory.json";
import { Address } from "../types";

function Navbar() {
    const { connect } = useConnect();
    const connector = new MetaMaskConnector();

    const {
        address: reactiveAddress,
        isConnected: reactiveIsConnected,
        status: reactiveStatus,
        isDisconnected,
    } = useAccount();
    const { disconnect } = useDisconnect();

    const [
        address,
        setAddress,
        isConnected,
        setIsConnected,
        status,
        setStatus,
        hasMultiSigWallet,
        setHasMultiSigWallet,
        multiSigWallets,
        setMultiSigWallets,
        resetState,
    ] = useConsignStore((state) => [
        state.address,
        state.setAddress,
        state.isConnected,
        state.setIsConnected,
        state.status,
        state.setStatus,
        state.hasMultiSigWallet,
        state.setHasMultiSigWallet,
        state.multiSigWallets,
        state.setMultiSigWallets,
        state.resetState,
    ]);

    const { data, isError, isLoading } = useContractRead({
        address: import.meta.env.VITE_MAIN_FACTORY_ADDRESS,
        abi: MainFactory.abi,
        functionName: "multiSigWalletsOf",
        args: [address],
    });

    const multiSigWalletsData = data as Address[];

    useEffect(() => {
        if (!isConnected || isDisconnected) resetState();
    }, [isDisconnected, isConnected]);

    useEffect(() => {
        setAddress(reactiveAddress);
        setIsConnected(reactiveIsConnected);
        setStatus(reactiveStatus);
        if (multiSigWalletsData !== undefined && multiSigWalletsData !== null) {
            setMultiSigWallets(multiSigWalletsData);
            setHasMultiSigWallet(multiSigWalletsData?.length !== 0);
        }
    }, [data, reactiveAddress, reactiveIsConnected, reactiveStatus]);

    async function handleClick() {
        if (isConnected) {
            disconnect();
            return;
        }
        connect({ connector });
    }

    return (
        <div className="bg-main">
            <header className="z-50 flex w-full flex-wrap text-sm dark:bg-gray-800 sm:flex-nowrap sm:justify-start">
                <nav
                    className="w-full sm:flex sm:items-center sm:justify-between"
                    aria-label="Global"
                >
                    <Link
                        className="flex-none bg-pp py-9 pr-9 pl-3 font-roboto text-3xl border-l-0 border-[4px] border-black"
                        to="/"
                    >
                        Consign
                    </Link>
                    <div className="mt-5 flex flex-row items-center gap-7 sm:mt-0 sm:justify-end sm:pl-5">
                        {address ? (
                            <>
                                {hasMultiSigWallet ? (
                                    <Link
                                        className="font-medium font-roboto text-xl text-black hover:underline"
                                        to="/issue"
                                    >
                                        Issue
                                    </Link>
                                ) : (
                                    <></>
                                )}
                                <Link
                                    className="font-medium font-roboto text-xl text-black hover:underline"
                                    to="/profile"
                                >
                                    Profile
                                </Link>
                                <Link
                                    className="font-medium font-roboto text-xl text-black hover:underline"
                                    to="/wallet"
                                >
                                    Wallet
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                        <button
                            onClick={handleClick}
                            className="text-xl font-roboto font-bold mr-14 bg-peachh p-3 border-t-2 border-l-2 border-r-4 border-b-4 hover:border-b-8 border-black"
                        >
                            {address
                                ? `Connected: ${address.slice(0, 7) + ".."}`
                                : "Connect Wallet"}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
