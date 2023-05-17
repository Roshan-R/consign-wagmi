import { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";

function Wallet() {

    const [isLoading, setIsLoading] = useState(false);

    const [maxInput, setMaxInput] = useState(3);
    const [minInput, setMinInput] = useState(2);
    const [adrs, setAdrs] = useState<number[]>([]);

    const roshan = "0xb089829772d86b570a9E7de8a1b1BBDB367704B1";
    const krisha = "0xc92aae0fa28EB56e78B33bCf24b427306816baCE";

    function handleFormSubmit(e: any) {
        e.preventDefault();
        for (const x of e.target) {
            if (x.value) {
                adrs.push(x.value)
            }
        }
        setAdrs(adrs)
        console.log(adrs)
        console.log(maxInput)
        console.log(minInput)
    }

    return (
        <div className="h-screen bg-main overflow-auto font-roboto">
            <Navbar />
            <div className="">
                <div>
                    <div className="ml-24 mt-16">
                        <div className="mb-8 text-6xl font-bold">
                            CREATE <br />
                            MUTISIG WALLET
                        </div>
                        <Input
                            type="number"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setMaxInput(Number(e.currentTarget.value))}
                            name="Total number of officials in wallet"
                        />
                        <Input
                            type="number"
                            onChange={(e: React.FormEvent<HTMLInputElement>) => setMinInput(Number(e.currentTarget.value))}
                            name="Minimum number of officials to approve the transaction"
                        />
                        <br></br>
                        <form onSubmit={handleFormSubmit} className="">
                            <div className="mb-4">
                                {maxInput ?
                                    <label
                                        htmlFor="username"
                                        className="block text-xl text-gray-700 font-bold mb-2"
                                    >
                                        Enter the wallet address
                                    </label>
                                    : <></>}

                                <div className="grid grid-cols-6 overflow-auto mr-12">
                                    {
                                        Array.from({ length: maxInput }, (_, index) => index).map((e: any, i: number) => (
                                            <div key={i}>
                                                <input
                                                    className="mb-5 h-9 bg-gray-300"
                                                    id="username"
                                                    type="text"
                                                    placeholder={`${i + 1}. Your wallet address here`}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="mt-6 text-xl font-bold mr-14 bg-peachh p-3 border-t-2 border-l-2 border-r-4 border-b-4 hover:border-b-8 border-black"
                                >
                                    {isLoading ? (
                                        <>
                                            <span
                                                className="animate-spin inline-block w-4 h-4 mr-2 border-[3px] border-current border-t-transparent text-black rounded-full"
                                                role="status"
                                                aria-label="loading"
                                            ></span>
                                            Loading
                                        </>
                                    ) : (
                                        <>Submit</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
