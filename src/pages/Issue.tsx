import { FaWallet } from "react-icons/fa";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import NftCertificate from "../components/NftCertificate";
import {
    useContractWrite,
    useContractRead,
    useWaitForTransaction,
    useAccount,
    usePrepareContractWrite
} from 'wagmi'
import { encodeFunctionData } from "viem";
import { toast } from "react-hot-toast";
import { Certificate_adr } from "../addrs";

import Certificate from "../../consign-contracts/abi/Certificate.json";
import MultiSigWallet from "../../consign-contracts/abi/MultiSigWallet.json";

import MainFactory from "../../consign-contracts/abi/MainFactory.json"
import { MainFactory_addr } from "../addrs";

import storeIPFS from "../helpers/nftStorage";

export default function Issue() {
    const { address, isConnected } = useAccount();

    const [toAddr, setToAddr] = useState('0xc92aae0fa28EB56e78B33bCf24b427306816baCE');
    const [tokenURI, setTokenURI] = useState('ipfs://bafyreih6rzkhzoi7jcxmszxqqrewbo75tw64k72pmlebyucn5rbqq6n464/metadata.json');

    const [file, setFile] = useState("");
    const [f, setF] = useState<File>();

    // const roshan = "0xb089829772d86b570a9E7de8a1b1BBDB367704B1"
    // const krishna = "0xc92aae0fa28EB56e78B33bCf24b427306816baCE"

    const contracr_contract_addr = Certificate_adr;

    const { data: readData, isLoading: loadRead, isError } = useContractRead({
        address: MainFactory_addr,
        abi: MainFactory.abi,
        functionName: 'multiSigWalletsOf',
        args: [address],
    })

    const encoded_data = encodeFunctionData({
        abi: Certificate.abi,
        functionName: 'issueCertificate',
        args: [toAddr, tokenURI],
    })

    const { config } = usePrepareContractWrite({
        address: readData[0] as `0x${string}`,
        abi: MultiSigWallet.abi,
        functionName: 'submitTransaction',
        args: [contracr_contract_addr, 0, encoded_data],
    })

    console.log(config)

    const { data, write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash
    })

    if (isSuccess) {
        toast.success('request successfully sent!')
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        const name = event.target[0].value;
        const addr = event.target[1].value;

        // let metadata_url = await storeIPFS(f!, name);
        // console.log(metadata_url)

        const metadata_url = "ipfs://bafyreih6rzkhzoi7jcxmszxqqrewbo75tw64k72pmlebyucn5rbqq6n464/metadata.json"
        setTokenURI(metadata_url);

        console.log(tokenURI, toAddr)
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files == null) return
        const f = event.target.files[0];
        setF(f);
        setFile(URL.createObjectURL(f));
    }

    return (
        <div className="h-screen bg-main ">
            <Navbar />
            <div className="flex flex-row justify-between">
                <form onSubmit={handleSubmit} method="post">
                    <div className="ml-24 mt-16">
                        <div className="mb-8 text-6xl font-roboto font-bold">
                            CREATE <br />
                            CERTIFICATE
                        </div>
                        <Input name="Certificate Name" placeholder="Name"></Input>
                        <Input name="Reciever Address" placeholder="0x0000a0123123">
                            <FaWallet />
                        </Input>
                        <label className="block text-gray-700 text-xl font-bold font-roboto">
                            Image file
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg"
                                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:border-0 
                file:text-sm file:font-semibold 
                file:bg-gray-500 file:text-white 
                hover:file:bg-gray-600 
                mb-5
                "
                            />
                        </label>
                        <SubmitButton disabled={!write} isLoading={isLoading} onClick={() => write?.()} />
                    </div>
                </form>

                {file ? (
                    <div className=" mx-32 my-16 w-2/5 ">
                        Certificate Preview
                        <NftCertificate
                            title="Some title"
                            image={file}
                            description="Some big ass Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
                        ></NftCertificate>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
