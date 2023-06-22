import MainFactory from "../../consign-contracts/abi/MainFactory.json"

import {
    useContractRead,
} from 'wagmi'

import { MainFactory_addr } from "../addrs"

function isPartOfMultiSig(addr: any) {
    const { data, isError, isLoading } = useContractRead({
        address: MainFactory_addr,
        abi: MainFactory.abi,
        functionName: 'multiSigWalletsOf',
        args: [addr, 0],
    })
    return !isError;
}

export default isPartOfMultiSig;
