import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers  } from "ethers";
import { SWRResponse } from "swr";



export type Web3Dependencies = {
 provider: providers.Web3Provider | null,
 contract: Contract | null,
 ethereum: MetaMaskInpageProvider | null,
}

export type CryrtoSwrResponse = SWRResponse; 

export type CryptoHandlerHook = (params: any) => SWRResponse;


export type CryptoHookFactory = {
    (d: Partial<Web3Dependencies>) : CryptoHandlerHook;

}