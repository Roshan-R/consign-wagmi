import Navbar from '../components/Navbar';
import Button from '../components/Button';
import splash from '../assets/enterprise-eth.webp'

function Home() {
    return (
        <div className="h-screen bg-main font-roboto">
            <Navbar />
            <div className="mx-9 mt-6 flex justify-between">
                <div className="mt-40 ml-4 flex flex-col">
                    <div className="text-7xl font-extrabold">CONSIGN</div>
                    <div className="text-2xl">A Decentralized Certificate Issuing Platform</div>
                    <Button text="Get Started"></Button>
                </div>
                <div className="flex border-brutal-lg justify-end items-center w-1/2">
                    <img alt="splashimage" src={splash} className="w-max"></img>
                </div>
            </div>
        </div >
    );
}

export default Home;
