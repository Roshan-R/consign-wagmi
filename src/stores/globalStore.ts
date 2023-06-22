import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Address, Status, Certificate, Transaction } from "../types";

interface ConsignState {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
  status: Status;
  setStatus: (status: Status) => void;
  address: Address;
  setAddress: (address: Address) => void;
  hasMultiSigWallet: boolean;
  setMultiSigWallets: (multiSigWallets: Address[]) => void;
  multiSigWallets: Address[];
  setHasMultiSigWallet: (hasMultiSigWallet: boolean) => void;
  profileStore: {
    certificates: Certificate[];
    setCertificates: (certificates: Certificate[]) => void;
  };
  dashboardStore: {
    wallet: Address;
    setWallet: (wallet: Address) => void;
    transactions: Transaction[];
    setTransactions: (transactions: Transaction[]) => void;
    owners: Address[];
    setOwners: (owners: Address[]) => void;
  };
}

const useConsignStore = create<ConsignState>()(
  devtools(
    persist(
      (set, get) => ({
        isConnected: false,
        setIsConnected: (isConnected: boolean) => set({ isConnected }),

        status: "disconnected",
        setStatus: (status: Status) => set({ status }),

        address: undefined,
        setAddress: (address: Address) => set({ address }),

        hasMultiSigWallet: false,
        setHasMultiSigWallet: (hasMultiSigWallet: boolean) =>
          set({ hasMultiSigWallet }),

        multiSigWallets: [],
        setMultiSigWallets: (multiSigWallets: Address[]) =>
          set({ multiSigWallets }),

        profileStore: {
          certificates: [],
          setCertificates: (certificates: Certificate[]) =>
            set((state) => ({
              profileStore: { ...state.profileStore, certificates },
            })),
        },

        dashboardStore: {
          wallet: undefined,
          setWallet: (wallet: Address) =>
            set((state) => ({
              dashboardStore: { ...state.dashboardStore, wallet },
            })),

          transactions: [],
          setTransactions: (transactions: Transaction[]) =>
            set((state) => ({
              dashboardStore: { ...state.dashboardStore, transactions },
            })),

          owners: [],
          setOwners: (owners: Address[]) =>
            set((state) => ({
              dashboardStore: { ...state.dashboardStore, owners },
            })),
        },
      }),
      { name: "consign-storage" }
    )
  )
);

export default useConsignStore;
