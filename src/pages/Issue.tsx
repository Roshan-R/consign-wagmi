import { FaWallet } from "react-icons/fa";
import Input from "../components/Input";
// import Certificate from "../helpers/Certificate";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast } from "react-hot-toast";
import SubmitButton from "../components/SubmitButton";
import NftCertificate from "../components/NftCertificate";

export default function Issue() {
    const [isloading, setIsLoading] = useState(false);
    const [file, setFile] = useState("");
    const [f, setF] = useState<File>();

    async function handleSubmit(event: any) {
        // event.preventDefault();
        //
        const name = event.target[0].value;
        const addr = event.target[1].value;
        //
        // setIsLoading(true);
        //
        // let cert_helper = new Certificate();
        // let metadata_url = await cert_helper.storeIPFS(f, name);
        // let b = await cert_helper.createNFT(addr, metadata_url);
        //
        // console.log(b)
        //
        // setIsLoading(false);
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
