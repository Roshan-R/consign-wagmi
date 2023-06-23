import MainFactory from "../../contracts/abi/MainFactory.json"

import {
    useContractRead,
} from 'wagmi'

function isPartOfMultiSig(addr: any) {
    const main_contract_addr = "0x8e01AFFe4358797965a46AE0a5fd82B8398BC40C"
    const { data, isError, isLoading } = useContractRead({
        address: main_contract_addr,
        abi: MainFactory.abi,
        functionName: 'multiSigWalletsOf',
        args: [addr, 0],
    })
    return !isError;
}

export default isPartOfMultiSig;
