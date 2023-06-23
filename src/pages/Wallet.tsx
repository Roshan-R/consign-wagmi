import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

import MainFactory from "../../contracts/abi/MainFactory.json"
import { useNavigate } from "react-router-dom";

import {
    useContractWrite,
    useWaitForTransaction,
    usePrepareContractWrite,
    useAccount,
    useContractRead
} from 'wagmi'

import { MainFactory_addr } from "../addrs";

function Wallet() {

    const { address } = useAccount();
    const navigate = useNavigate();
    const { data: readData, isLoading: loadRead }: { data: any, isLoading: boolean } = useContractRead({
        address: MainFactory_addr,
        abi: MainFactory.abi,
        functionName: 'multiSigWalletsOf',
        args: [address],
    })

    useEffect(() => {
        if (loadRead === false) {
            readData.length === 0 ? {} : navigate('/dashboard');
        }
    }, [loadRead]);


    const [maxInput, setMaxInput] = useState(3);
    const [minInput, setMinInput] = useState(2);
    const [adrs, setAdrs] = useState<string[]>([]);


    const { write } = useContractWrite({
        address: import.meta.env.VITE_MAIN_FACTORY_ADDRESS,
        abi: MainFactory.abi,
        functionName: 'createMultiSigWallet',
    })

    const { isLoading } = useWaitForTransaction({})

    function handleFormSubmit(e: any) {
        e.preventDefault();
        console.log(maxInput, minInput)
        console.log(adrs)
        for (const x of e.target) {
            if (x.value) {
                adrs.push(x.value)
            }
        }
        console.log(adrs)
        setAdrs(adrs)

        write({
            args: [adrs, minInput],
        })
    }

    return (
        <div className="h-screen bg-main overflow-auto font-roboto">
            <Navbar />
            <div className="">
                <div>
                    <div className="ml-24 mt-16">
                        <div className="mb-8 text-6xl font-bold">
                            CREATE <br />
                            MUTISIG WALLET
                        </div>
                        <Input
                            type="number"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setMaxInput(Number(e.currentTarget.value))}
                            name="Total number of officials in wallet"
                        />
                        <Input
                            type="number"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setMinInput(Number(e.currentTarget.value))}
                            name="Minimum number of officials to approve the transaction"
                        />
                        <br></br>
                        <form onSubmit={handleFormSubmit} className="">
                            <div className="mb-4">
                                {maxInput ?
                                    <label
                                        htmlFor="username"
                                        className="block text-xl text-gray-700 font-bold mb-2"
                                    >
                                        Enter the wallet address
                                    </label>
                                    : <></>}

                                <div className="grid grid-cols-6 overflow-auto mr-12">
                                    {
                                        Array.from({ length: maxInput }, (_, index) => index).map((e: any, i: number) => (
                                            <div key={i}>
                                                <input
                                                    className="mb-5 h-9 bg-gray-300"
                                                    id="username"
                                                    type="text"
                                                    placeholder={`${i + 1}. Your wallet address here`}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <SubmitButton isLoading={isLoading} onClick={() => write?.()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
