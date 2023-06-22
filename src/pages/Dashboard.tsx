import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useContractReads } from "wagmi";
import CertificateDashboard from "../components/CertificateDashboard";
import Certificate from "../../consign-contracts/abi/Certificate.json"
import { decodeFunctionData } from 'viem'
import type { ExtractAbiFunctionNames, AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype'

type CertificateType = {
    num_approvals: BigInt,
    title: string,
    image: string,
    to_addr: `0x${string}`,
}

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


export default function Dashboard() {


    const [datas, setDatas] = useState<Array<CertificateType>>([]);
    useEffect(() => {
        console.log("The datas from the usestate shit ", datas)
    }, [datas])

    function List() {
        const half = datas.length;

        const itemList = datas.slice(half).map((item) => (
            <CertificateDashboard
                num_approvals={item.num_approvals}
                title={item.title}
                image={item.image}
                to_addr={item.to_addr as `0x${string}`}
            ></CertificateDashboard>
        ));
        return (
            <div className="grid grid-cols-3 gap-6">
                {itemList}
            </div>
        );
    }

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

    const { data }: { data: Array<any> | undefined } = useContractReads({
        contracts
    })


    useEffect(() => {

        async function createCertificateData(cert_data: any) {
            if (cert_data) {
                for (let i = 0; i < cert_data.length; i++) {
                    const item = cert_data[i];

                    const { functionName, args }: { functionName: string, args: any } = decodeFunctionData({
                        abi: Certificate.abi,
                        data: item.result[2]
                    })

                    console.log(functionName, args[1])
                    const metadataResponse = await fetch(args[1].replace('ipfs://', 'https://gateway.ipfs.io/ipfs/'));
                    const metadata = await metadataResponse.json();

                    const mappedItem = {
                        num_approvals: item.result[4],
                        to_addr: item.result[0],
                        title: metadata.name,
                        image: metadata.image.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/'),
                    };

                    console.log(mappedItem)
                    setDatas(datas => [...datas, mappedItem]);
                }

            }
        }
        console.log(datas)
        createCertificateData(data)
    }, [data]);

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
                <List></List>
            </div>
        </div >
    );
}
