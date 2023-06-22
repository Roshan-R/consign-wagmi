import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAccount, useContractRead } from "wagmi";
import CertificateDashboard from "../components/CertificateDashboard";
import MultiSigWallet from "../../consign-contracts/abi/MultiSigWallet.json"

type NFTResponse = {
    ownedNfts: {
        tokenUri: {
            gateway: string;
        };
    }[];
};

type NFTMetadata = {};



export default function Dashboard() {

    const { data, isError, isLoading } = useContractRead({
        address: "0x9a12072272fDC300308113B8C5ED324c5e245464",
        abi: MultiSigWallet.abi,
        functionName: 'getTransactionCount',
        args: []
    })
    console.log(data, isError, isLoading)

    return (
        <div className="bg-main">
            <Navbar></Navbar>
            <div className="flex bg-main flex-col justify-start mb-12 pt-3 px-10">
                <div className="ml-12 mt-8">
                    <p className="text-6xl font-roboto font-bold">DASHBOARD</p>
                </div>
            </div>
            <div className="ml-24 mr-14">
                <div className="text-2xl font-roboto mb-2">
                    Certificates Pending Decision
                </div>
                <div className="grid grid-cols-3 gap-6">
                    <CertificateDashboard
                        num_approvals={2}
                        title="Drishti Certificate"
                        image="https://picsum.photos/350/400"
                        to_addr="0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf"
                        addrs={[
                            "0x0E42B72b0937eF6cd07d312E9F4FaEffc73dc7e7",
                            "0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf",
                        ]}
                    ></CertificateDashboard>
                    <CertificateDashboard
                        num_approvals={2}
                        title="Drishti Certificate"
                        image="https://picsum.photos/350/400"
                        to_addr="0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf"
                        addrs={[
                            "0x0E42B72b0937eF6cd07d312E9F4FaEffc73dc7e7",
                            "0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf",
                        ]}
                    ></CertificateDashboard>
                    <CertificateDashboard
                        num_approvals={2}
                        title="Drishti Certificate"
                        image="https://picsum.photos/350/400"
                        to_addr="0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf"
                        addrs={[
                            "0x0E42B72b0937eF6cd07d312E9F4FaEffc73dc7e7",
                            "0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf",
                        ]}
                    ></CertificateDashboard>
                    <CertificateDashboard
                        num_approvals={2}
                        title="Drishti Certificate"
                        image="https://picsum.photos/350/400"
                        to_addr="0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf"
                        addrs={[
                            "0x0E42B72b0937eF6cd07d312E9F4FaEffc73dc7e7",
                            "0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf",
                        ]}
                    ></CertificateDashboard>
                    <CertificateDashboard
                        num_approvals={2}
                        title="Drishti Certificate"
                        image="https://picsum.photos/350/400"
                        to_addr="0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf"
                        addrs={[
                            "0x0E42B72b0937eF6cd07d312E9F4FaEffc73dc7e7",
                            "0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf",
                        ]}
                    ></CertificateDashboard>
                    <CertificateDashboard
                        num_approvals={2}
                        title="Drishti Certificate"
                        image="https://picsum.photos/350/400"
                        to_addr="0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf"
                        addrs={[
                            "0x0E42B72b0937eF6cd07d312E9F4FaEffc73dc7e7",
                            "0x99Eb13B75D0BAFEf658cdFCE4047474F8023feCf",
                        ]}
                    ></CertificateDashboard>
                </div>
            </div>
        </div>
    );
}
