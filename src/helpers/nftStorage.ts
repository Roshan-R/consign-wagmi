import { NFTStorage, File } from 'nft.storage'

async function storeIPFS(image: File, name: string, description: string =  "An NFT based certificate") {
    const client = new NFTStorage({ token: import.meta.env.VITE_NFT_STORAGE_KEY || "" })

    console.log(image);


    let res = await client.store({
        image,
        name,
        description,
    });

    console.log(res)
    return res.url;
}

export default storeIPFS;
