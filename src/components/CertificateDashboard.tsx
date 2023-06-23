import { useState } from "react";
import { multiSigWalletAbi } from "../abi";
import useConsignStore from "../stores/globalStore";
import { useContractWrite } from "wagmi";

type address = `0x${string}`;

type Props = {
  index: number;
  title: string;
  to_addr: address;
  image: string;
  num_approvals: BigInt;
  numConfirmationRequired: number;
};

const CertificateDashboard = ({
  index,
  title,
  to_addr,
  image,
  num_approvals,
  numConfirmationRequired,
}: Props) => {
  const [showModal, setShowModal] = useState(false);

  const [
    multiSigWallets,
    wallet,
    setWallet,
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

  function ApporoveTransaction() {
    console.log("Clicked Approve", multiSigWallets[0], index);
    writeConfirm();
  }

  function RevokeTransaction() {
    console.log("Clicked Revoke", multiSigWallets[0], index);
    writeRevoke();
  }

  function ExecuteTransaction() {
    console.log("Clicked Execute", multiSigWallets[0], index);
    writeExecute();
  }

  const { write: writeConfirm } = useContractWrite({
    address: multiSigWallets[0],
    abi: multiSigWalletAbi,
    functionName: "confirmTransaction",
    args: [BigInt(index)],
  });

  const { write: writeRevoke } = useContractWrite({
    address: multiSigWallets[0],
    abi: multiSigWalletAbi,
    functionName: "revokeConfirmation",
    args: [BigInt(index)],
  });

  const { write: writeExecute } = useContractWrite({
    address: multiSigWallets[0],
    abi: multiSigWalletAbi,
    functionName: "executeTransaction",
    args: [BigInt(index)],
  });

  return (
    <div className="border-brutal bg-white flex flex-col">
      <div className="mr-2 flex ">
        <div className="ml-2 flex w-full flex-col pt-1 font-roboto">
          <div className="text-2xl">{title}</div>
          <div className="text-xl text-gray-800 italic">to: {to_addr}</div>
          <div className="flex justify-between border-brutal mb-3  bg-gray-200 px-2 py-2">
            <div className=" ">
              number of approvals : {Number(num_approvals)} / {numConfirmationRequired} {}
              <br />
            </div>

            <div className="flex flex-col gap-2 justify-center">
              <button
                onClick={ApporoveTransaction}
                className="bg-greenn w-19 border-brutal fill-white hover:border-brutal-hover"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </button>
              <button
                onClick={ExecuteTransaction}
                className="bg-greenn w-19 border-brutal fill-white hover:border-brutal-hover"
              >
                Execute
              </button>
              <button
                onClick={RevokeTransaction}
                className="bg-redd border-brutal p-1 fill-white hover:border-brutal-hover "
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.9357 4.28235C23.8502 3.43062 23.8502 2.04741 22.9357 1.19568C22.0213 0.343952 20.5362 0.343952 19.6217 1.19568L11.9182 8.37747L4.20736 1.2025C3.29289 0.350766 1.80779 0.350766 0.893318 1.2025C-0.0211531 2.05423 -0.0211531 3.43744 0.893318 4.28917L8.60414 11.4641L0.900634 18.6459C-0.0138374 19.4977 -0.0138374 20.8809 0.900634 21.7326C1.8151 22.5843 3.30021 22.5843 4.21468 21.7326L11.9182 14.5508L19.629 21.7258C20.5435 22.5775 22.0286 22.5775 22.943 21.7258C23.8575 20.8741 23.8575 19.4908 22.943 18.6391L15.2322 11.4641L22.9357 4.28235Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-brutal flex grow justify-center bg-purple-400">
        <img
          src={image}
          onClick={(e) => {
            setShowModal(true);
          }}
          className="border-brutal m-2 w-4/5 bg-gray-200 cursor-pointer hover:opacity-90 transition-all"
        ></img>
      </div>

      {showModal ? (
        <div className="z-10 h-screen w-screen fixed inset-0 flex justify-center">
          <img src={image} className="border-brutal object-contain "></img>
          <button
            onClick={(e) => {
              setShowModal(false);
            }}
            className="absolute bg-peachh font-roboto bottom-2 border-brutal p-1"
          >
            close
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CertificateDashboard;
