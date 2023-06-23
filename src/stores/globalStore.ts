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
    transactionCount: number;
    setTransactionCount: (transactionCount: number) => void;
    transactions: Transaction[];
    setTransactions: (transactions: Transaction[]) => void;
    owners: Address[];
    setOwners: (owners: Address[]) => void;
    numConfirmation: number | null;
    setNumConfirmation: (numConfirmation: number | null) => void;
  };
  resetState: () => void;
}

const useConsignStore = create<ConsignState>()(
  devtools(
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

        transactionCount: 0,
        setTransactionCount: (transactionCount: number) =>
          set((state) => ({
            dashboardStore: { ...state.dashboardStore, transactionCount },
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

        numConfirmation: null,
        setNumConfirmation: (numConfirmation: number | null) =>
          set((state) => ({
            dashboardStore: { ...state.dashboardStore, numConfirmation },
          })),
      },
      resetState: () =>
        set((state) => ({
          isConnected: false,
          status: "disconnected",
          address: undefined,
          hasMultiSigWallet: false,
          multiSigWallets: [],
          profileStore: {
            ...state.profileStore,
            certificates: [],
          },
          dashboardStore: {
            ...state.dashboardStore,
            wallet: undefined,
            transactionCount: 0,
            transactions: [],
            owners: [],
            numConfirmation: null,
          },
        })),
    }),
    { name: "consign-storage" }
  )
);

export default useConsignStore;
