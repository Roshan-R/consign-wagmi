import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

import MainFactory from "../../consign-contracts/abi/MainFactory.json"
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
    const { data: readData, isLoading: loadRead } = useContractRead({
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
    const [adrs, setAdrs] = useState<string[]>(
        ["0x11d77214c1621EA0529357eA0179b294310b67A7", "0x3412879831a687ce0a752e37aF3bBf941884fB41", "0x19b41d78eA16fb99885bf6265add688a7EBE6DD6"]
    );

    const roshan = "0xb089829772d86b570a9E7de8a1b1BBDB367704B1";
    const krisha = "0xc92aae0fa28EB56e78B33bCf24b427306816baCE";

    const { config } = usePrepareContractWrite({
        address: MainFactory_addr,
        abi: MainFactory.abi,
        functionName: 'createMultiSigWallet',
        args: [adrs, minInput],
    })

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    })

    function handleFormSubmit(e: any) {
        e.preventDefault();
        console.log(maxInput, minInput)
        console.log(adrs)
        // for (const x of e.target) {
        //     if (x.value) {
        //         adrs.push(x.value)
        //     }
        // }
        // setAdrs(adrs)
        // console.log(adrs)
        // console.log(maxInput)
        // console.log(minInput)
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
                                <SubmitButton disabled={!write} isLoading={isLoading} onClick={() => write?.()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
