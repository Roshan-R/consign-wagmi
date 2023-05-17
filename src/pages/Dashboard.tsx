import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAccount } from "wagmi";
import CertificateDashboard from "../components/CertificateDashboard";

type NFTResponse = {
  ownedNfts: {
    tokenUri: {
      gateway: string;
    };
  }[];
};

type NFTMetadata = {};

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  const [nfts, setNfts] = useState<NFTMetadata[]>([]);

  const [len, setLen] = useState();
  const [loading, setLoading] = useState(false);

  async function parseJson(json: NFTResponse) {
    for (const e of json.ownedNfts) {
      const response = await fetch(e.tokenUri.gateway);
      const obj = await response.json();
      console.log(obj);
      setNfts((nfts) => [...nfts, obj]);
    }
  }
  useEffect(() => {
    if (nfts.length == len) {
      setLoading(true);
    }
  }, [nfts]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/getNFTs/?owner=${address}`;

    let requestOptions: RequestInit = {
      method: "get",
      redirect: "follow",
    };

    let ignore = false;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        if (!ignore) {
          setLen(json.ownedNfts.length);
          parseJson(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);
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
