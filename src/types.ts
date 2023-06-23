type Address = `0x${string}` | undefined;

type Status = "connected" | "disconnected" | "connecting" | "reconnecting";

type Certificate = {
  tokenId: number;
  metadata: {
    name: string;
    image: string;
    description: string;
  };
};

type Transaction = {
  to: NonNullable<Address>;
  value: number;
  data: string;
  executed: boolean;
  numConfirmations: number;
};

export type { Address, Status, Certificate, Transaction };
