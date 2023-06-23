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
  usePrepareContractWrite,
} from "wagmi";
import { encodeFunctionData } from "viem";
import { toast } from "react-hot-toast";
import { Certificate_adr } from "../addrs";

import Certificate from "../../consign-contracts/abi/Certificate.json";
import MultiSigWallet from "../../consign-contracts/abi/MultiSigWallet.json";

import MainFactory from "../../consign-contracts/abi/MainFactory.json";
import { MainFactory_addr } from "../addrs";

import storeIPFS from "../helpers/nftStorage";
import useConsignStore from "../stores/globalStore";

export default function Issue() {
  const [multiSigWallets, setMultiSigWallets] = useConsignStore((state) => [
    state.multiSigWallets,
    state.setMultiSigWallets,
  ]);

  const [receiverAddress, setReceiverAddress] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [encodedData, setEncodedData] = useState("");
  const [canWriteTransaction, setCanWriteTransaction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File>();
  const [imageBlob, setImageBlob] = useState<Blob>();
  const [title, setTitle] = useState("Certificate");
  const [description, setDescription] = useState("An NFT based certificate");

  const certificateAddress = import.meta.env.CERTIFICATE_ADDRESS;

  const {
    data,
    isLoading: isLoadingContractWrite,
    isSuccess,
    write,
  } = useContractWrite({
    address: multiSigWallets[0],
    abi: MultiSigWallet.abi,
    functionName: "submitTransaction",
    args: [import.meta.env.VITE_CERTIFICATE_ADDRESS, 0, encodedData],
  });

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = reader.result;
        const blob = new Blob([imageData as ArrayBuffer], { type: file.type });
        setImageBlob(blob);
      };

      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  useEffect(() => {
    if (!isLoadingContractWrite) {
      setIsLoading(false);
    }
  }, [isLoadingContractWrite]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Certificate issue request successfully sent!");
      // TODO: go to dashboard
    }
  }, [isSuccess]);

  // if (isSuccess) {
  //     toast.success('request successfully sent!')
  // }

  async function handleSubmit(event: any) {
    setIsLoading(true);
    event.preventDefault();

    const name = event.target[0].value;
    const addr = event.target[1].value;

    let metadata_url = await storeIPFS(file!, name);
    console.log(metadata_url);

    // const metadata_url = "ipfs://bafyreih6rzkhzoi7jcxmszxqqrewbo75tw64k72pmlebyucn5rbqq6n464/metadata.json"
    // const metadat_url = storeIPFS(imageBlob, name);
    setTokenURI(metadata_url);

    console.log(tokenURI, receiverAddress);
    setCanWriteTransaction(true);
  }

  useEffect(() => {
    if (tokenURI !== "" && receiverAddress !== "") {
      const encodedData = encodeFunctionData({
        abi: Certificate.abi,
        functionName: "issueCertificate",
        args: [receiverAddress, tokenURI],
      });
      setEncodedData(encodedData);
    }
  }, [tokenURI, receiverAddress]);

  useEffect(() => {
    if (encodedData && canWriteTransaction) {
      console.log(encodedData);
      write?.();
      setCanWriteTransaction(false);
    }
  }, [encodedData]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null) return;
    const f = event.target.files[0];
    setFile(f);
    setFileName(URL.createObjectURL(f));
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
            <Input
              name="Certificate Name"
              placeholder="Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
            />
            <Input
              name="Reciever Address"
              placeholder="0x0000a0123123"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setReceiverAddress(e.target.value)
              }
              value={receiverAddress}
            />
            <Input
              name="Description"
              placeholder="Description"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              value={description}
            />
            <label className="block text-gray-700 text-xl font-bold font-roboto">
              Image file
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
            <SubmitButton disabled={!write} isLoading={isLoading} />
          </div>
        </form>

        {fileName ? (
          <div className=" mx-32 my-16 w-2/5 ">
            Certificate Preview
            <NftCertificate
              title={title}
              image={fileName}
              description={description}
            ></NftCertificate>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
