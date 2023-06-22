import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Address, useAccount, useContractRead, useContractReads } from "wagmi";
import CertificateDashboard from "../components/CertificateDashboard";
import type {
  ExtractAbiFunctionNames,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
} from "abitype";

import { multiSigWalletAbi } from "../abi";
import useConsignStore from "../stores/globalStore";

type NFTResponse = {
  ownedNfts: {
    tokenUri: {
      gateway: string;
    };
  }[];
};

type NFTMetadata = {};

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

  const transactionsReadArray: {
    address: Address;
    abi: typeof multiSigWalletAbi;
    functionName: ExtractAbiFunctionNames<typeof multiSigWalletAbi>;
    args: AbiParametersToPrimitiveTypes<
      ExtractAbiFunction<typeof multiSigWalletAbi, "getTransaction">["inputs"]
    >;
  }[] = Array(transactionCount)
    .fill(0)
    .map((_, i) => {
      return {
        address: "0x9a12072272fDC300308113B8C5ED324c5e245464",
        abi: multiSigWalletAbi,
        functionName: "getTransaction",
        args: [BigInt(i)],
      };
    });

  const { data, isError, isLoading } = useContractReads({
    contracts: transactionsReadArray,
  });

  const { data: numConfirmationData } = useContractRead({
    address: import.meta.env.VITE_MULTISIG_WALLET_ADDRESS,
    abi: multiSigWalletAbi,
    functionName: "numConfirmationsRequired",
  });

  useEffect(() => {
    console.log("numConfirmationData :", numConfirmationData);
    if (!numConfirmationData) return;
    setNumConfirmation(numConfirmationData);
  }, [numConfirmationData]);

  useEffect(() => {
    console.log("multiSigWallets :", multiSigWallets);
    if (!multiSigWallets) return;
    setWallet(multiSigWallets[0]);
  }, [multiSigWallets]);

  useEffect(() => {
    if (!data) return;
    if (!isError && !isLoading) {
      const transactionsData = data as Array<any>;
      setTransactions(transactionsData);
      setTransactionCount(transactionsData.length);
    }
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
