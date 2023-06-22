import { narrow } from 'abitype'
import Certificate from "../consign-contracts/abi/Certificate.json"
import MultiSigWallet from "../../consign-contracts/abi/MultiSigWallet.json"

const certificate_abi = narrow(Certificate.abi)
const multisig_abi = narrow(MultiSigWallet.abi)

export { certificate_abi, multisig_abi }
