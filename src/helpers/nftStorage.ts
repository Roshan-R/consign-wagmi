import { NFTStorage, File } from 'nft.storage'

async function storeIPFS(image: File, name: string) {
    const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_KEY || "" })

    console.log(image);

    let description = "An NFT based certificate";

    let res = await client.store({
        image,
        name,
        description,
    });

    console.log(res)
    return res.url;
}

export default storeIPFS;
