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
    to: Address;
    value: number;
    data: string;
};

export type { Address, Status, Certificate, Transaction };
