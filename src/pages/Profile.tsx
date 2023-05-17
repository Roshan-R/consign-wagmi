import { useEffect, useState } from "react";
import NftCertificate from "../components/NftCertificate";
import Navbar from "../components/Navbar";
import { useAccount } from "wagmi";

type NFTResponse = {
  ownedNfts: {
    tokenUri: {
      gateway: string;
    };
  }[];
};

type NFTMetadata = {
  name: string,
  image: string,
};

export default function Profile() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [len, setLen] = useState();
  const [loading, setLoading] = useState(false);

  async function parseJson(json: any) {
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
    <div className="h-screen bg-main">
      <Navbar></Navbar>
      <div className="flex bg-main flex-col justify-start mb-12 pt-3 px-10">
        <div className="ml-12 mt-8">
          <p className="text-6xl font-roboto font-bold">CERTIFICATES</p>
        </div>
      </div>
      <div className="ml-24 mr-14">
        <div className="grid grid-cols-3 gap-6">
          {loading ? (
            nfts.map((el, i) => (
              <NftCertificate
                key={i}
                title={el.name}
                image={el.image.replace(
                  "ipfs://",
                  "https://cloudflare-ipfs.com/ipfs/"
                )}
              />
            ))
          ) : (
            <>Loading</>
          )}
        </div>
      </div>
    </div>
  );
}
