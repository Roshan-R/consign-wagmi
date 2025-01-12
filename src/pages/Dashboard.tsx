import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useContractReads, useContractRead } from "wagmi";
import CertificateDashboard from "../components/CertificateDashboard";

import Certificate from "../../contracts/abi/Certificate.json";
import { Address, decodeFunctionData } from "viem";
import type {
    ExtractAbiFunctionNames,
    AbiParametersToPrimitiveTypes,
    ExtractAbiFunction,
} from "abitype";

import { multiSigWalletAbi } from "../abi";

type CertificateType = {
    num_approvals: number;
    title: string;
    image: string;
    to_addr: `0x${string}`;
};

import useConsignStore from "../stores/globalStore";

export default function Dashboard() {
    const [
        multiSigWallets,
        wallet,
        setWallet,
        transactionCount,
        setTransactionCount,
        transactions,
        setTransactions,
        numConfirmation,
        setNumConfirmation,
    ] = useConsignStore((state) => [
        state.multiSigWallets,
        state.dashboardStore.wallet,
        state.dashboardStore.setWallet,
        state.dashboardStore.transactionCount,
        state.dashboardStore.setTransactionCount,
        state.dashboardStore.transactions,
        state.dashboardStore.setTransactions,
        state.dashboardStore.numConfirmation,
        state.dashboardStore.setNumConfirmation,
    ]);

    const [datas, setDatas] = useState<Array<CertificateType>>([]);
    useEffect(() => {
        console.log("The datas from the usestate shit ", datas);
    }, [datas]);

    function List() {
        var x = [];
        for (var i = 0; i < datas.length; i = i + 2) {
            x.push(datas[i]);
        }

        const itemList = x.map((item, index) => (
            <CertificateDashboard
                index={index}
                num_approvals={item.num_approvals}
                title={item.title}
                image={item.image}
                to_addr={item.to_addr as `0x${string}`}
                numConfirmationRequired={numConfirmation!}
            ></CertificateDashboard>
        ));
        return <div className="grid grid-cols-3 gap-6">{itemList}</div>;
    }

    let contracts: {
        address: `0x${string}` | undefined;
        abi: typeof multiSigWalletAbi;
        functionName: ExtractAbiFunctionNames<typeof multiSigWalletAbi>;
        args: AbiParametersToPrimitiveTypes<
            ExtractAbiFunction<typeof multiSigWalletAbi, "getTransaction">["inputs"]
        >;
    }[] = Array(transactionCount)
        .fill(0)
        .map((_, i) => {
            return {
                address: multiSigWallets[0],
                abi: multiSigWalletAbi,
                functionName: "getTransaction",
                args: [BigInt(i)],
            };
        });

    const { data }: { data: Array<any> | undefined } = useContractReads({
        contracts,
    });

    useEffect(() => {
        console.log("data :", data);
        if (!data) return;
        setTransactions(
            data.map((item) => ({
                to: item.result[0],
                value: Number(item.result[1]),
                data: item.result[2],
                executed: item.result[3],
                numConfirmations: Number(item.result[4]),
            }))
        );
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            const mappedTransactions = await Promise.all(
                transactions.map(async (item, index) => {
                    const data = item.data;
                    const { functionName, args }: { functionName: string; args: any } =
                        decodeFunctionData({
                            abi: Certificate.abi,
                            data: data as `0x${string}`,
                        });

                    console.log(functionName, args[1]);
                    const metadataResponse = await fetch(
                        args[1].replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
                    );
                    const { name: title, image } = await metadataResponse.json();

                    const mappedItem = {
                        num_approvals: item.numConfirmations,
                        to_addr: item.to,
                        title: title,
                        image: image.replace("ipfs://", "https://gateway.ipfs.io/ipfs/"),
                    };
                    return mappedItem;
                })
            );

            // Use the mappedTransactions as needed
            console.log(mappedTransactions);
            setDatas(mappedTransactions);
        };

        fetchData();
    }, [transactions]);

    const { data: numConfirmationData } = useContractRead({
        address: multiSigWallets[0],
        abi: multiSigWalletAbi,
        functionName: "numConfirmationsRequired",
    });

    useEffect(() => {
        console.log("numConfirmationData :", numConfirmationData);
        if (!numConfirmationData) return;
        setNumConfirmation(Number(numConfirmationData));
    }, [numConfirmationData]);

    const { data: transactionCountData } = useContractRead({
        address: multiSigWallets[0],
        abi: multiSigWalletAbi,
        functionName: "getTransactionCount",
    });

    useEffect(() => {
        console.log("transactionCountData :", transactionCountData);
        if (!transactionCountData) return;
        setTransactionCount(Number(transactionCountData));
    }, [transactionCountData]);

    useEffect(() => {
        console.log("multiSigWallets :", multiSigWallets);
        if (!multiSigWallets) return;
        setWallet(multiSigWallets[0]);
    }, [multiSigWallets]);
    //
    // useEffect(() => {
    //   async function createCertificateData(cert_data: any) {
    //     if (cert_data) {
    //       for (let i = 0; i < cert_data.length; i++) {
    //         const item = cert_data[i];
    //
    //         const { functionName, args }: { functionName: string; args: any } =
    //           decodeFunctionData({
    //             abi: Certificate.abi,
    //             data: item.result[2],
    //           });
    //
    //         console.log(functionName, args[1]);
    //         const metadataResponse = await fetch(
    //           args[1].replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
    //         );
    //         const metadata = await metadataResponse.json();
    //
    //         const mappedItem = {
    //           num_approvals: item.result[4],
    //           to_addr: item.result[0],
    //           title: metadata.name,
    //           image: metadata.image.replace(
    //             "ipfs://",
    //             "https://gateway.ipfs.io/ipfs/"
    //           ),
    //         };
    //
    //         console.log(mappedItem);
    //         setDatas((datas) => [...datas, mappedItem]);
    //       }
    //     }
    //   }
    //   console.log(datas);
    //   createCertificateData(data);
    // }, [data]);

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
                    {datas.map((item, index) => {
                        return (
                            <CertificateDashboard
                                index={index}
                                num_approvals={item.num_approvals}
                                title={item.title}
                                image={item.image}
                                to_addr={item.to_addr}
                                numConfirmationRequired={numConfirmation!}
                            ></CertificateDashboard>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
