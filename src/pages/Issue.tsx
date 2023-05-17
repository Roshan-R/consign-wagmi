import { FaWallet } from "react-icons/fa";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import NftCertificate from "../components/NftCertificate";

import mainabi from "../../consign-contracts/out/MainFactory.sol/MainFactory.json"
import { useContractWrite } from 'wagmi'


import storeIPFS from "../helpers/nftStorage";

export default function Issue() {

    const roshan = "0xb089829772d86b570a9E7de8a1b1BBDB367704B1"
    const krishna = "0xc92aae0fa28EB56e78B33bCf24b427306816baCE"
    const maincontractaddr = "0x9dBD1700B9492a6Ea192Ddf141FEce210017bd66"

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: maincontractaddr,
        abi: mainabi.abi,
        functionName: 'issueCertificate'
    })



    const [isloading, setIsLoading] = useState(false);
    const [file, setFile] = useState("");
    const [f, setF] = useState<File>();

    async function handleSubmit(event: any) {
        event.preventDefault();

        const name = event.target[0].value;
        const addr = event.target[1].value;

        setIsLoading(true);

        // let metadata_url = await storeIPFS(f!, name);
        // console.log(metadata_url)

        const metadata_url = "ipfs://bafyreih6rzkhzoi7jcxmszxqqrewbo75tw64k72pmlebyucn5rbqq6n464/metadata.json"

        write({
            args: [krishna, metadata_url]
        })

        setIsLoading(false);
        // toast.success('Successfully created certificate!')
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
                        <SubmitButton isloading={isloading}></SubmitButton>
                    </div>
                </form>
                {isLoading && <div>Looking</div>}
                {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}

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
