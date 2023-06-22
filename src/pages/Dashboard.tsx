import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import CertificateDashboard from "../components/CertificateDashboard";
import MultiSigWallet from "../../consign-contracts/abi/MultiSigWallet.json"
import { Certificate_adr } from "../addrs";
import Certificate from "../../consign-contracts/abi/Certificate.json"
import { AbiItem, decodeFunctionData } from 'viem'
import { AbiEvent } from 'abitype'
import type { ExtractAbiFunctions, ExtractAbiFunctionNames, AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype'

import { multisig_abi } from "../abi";
import { ExtractAbiEvent } from 'abitype'


const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "txIndex",
                "type": "uint256"
            }
        ],
        "name": "ConfirmTransaction",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "txIndex",
                "type": "uint256"
            }
        ],
        "name": "ExecuteTransaction",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "version",
                "type": "uint8"
            }
        ],
        "name": "Initialized",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "txIndex",
                "type": "uint256"
            }
        ],
        "name": "RevokeConfirmation",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "txIndex",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "SubmitTransaction",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_txIndex",
                "type": "uint256"
            }
        ],
        "name": "confirmTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_txIndex",
                "type": "uint256"
            }
        ],
        "name": "executeTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOwners",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_txIndex",
                "type": "uint256"
            }
        ],
        "name": "getTransaction",
        "outputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            },
            {
                "internalType": "bool",
                "name": "executed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "numConfirmations",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTransactionCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_owners",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "_numConfirmationsRequired",
                "type": "uint256"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isConfirmed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isOwner",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numConfirmationsRequired",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "owners",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_txIndex",
                "type": "uint256"
            }
        ],
        "name": "revokeConfirmation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "submitTransaction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "transactions",
        "outputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            },
            {
                "internalType": "bool",
                "name": "executed",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "numConfirmations",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
] as const;





type NFTResponse = {
    ownedNfts: {
        tokenUri: {
            gateway: string;
        };
    }[];
};

type NFTMetadata = {};

export default function Dashboard() {

    // const { data, isError, isLoading } = useContractRead({
    //     address: "0x9a12072272fDC300308113B8C5ED324c5e245464",
    //     abi: MultiSigWallet.abi,
    //     functionName: 'getTransactionCount',
    //     args: []
    // })

    let transactionCount = 2;

    let contracts: {
        address: `0x${string}`,
        abi: typeof abi,
        functionName: ExtractAbiFunctionNames<typeof abi>,
        args: AbiParametersToPrimitiveTypes<ExtractAbiFunction<typeof abi, 'getTransaction'>['inputs']>
    }[] = Array(transactionCount).fill(0).map((_, i) => {

        return {
            address: "0x9a12072272fDC300308113B8C5ED324c5e245464",
            abi: abi,
            functionName: 'getTransaction',
            args: [BigInt(i)]
        };

    })

    const { data, isError, isLoading } = useContractReads({
        contracts
    })
    console.log(data)

    //
    //
    // const { data, isError, isLoading } = useContractRead({
    //     address: "0x9a12072272fDC300308113B8C5ED324c5e245464",
    //     abi: MultiSigWallet.abi,
    //     functionName: 'getTransaction',
    //     args: [0]
    // })
    //
    // useEffect(() => {
    //     if (data) {
    //         const { functionName, args } = decodeFunctionData({
    //             abi: Certificate.abi,
    //             data: data[2]
    //         })
    //         console.log(functionName, args)
    //     }
    // }, [data])
    //

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
