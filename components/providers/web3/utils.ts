import { setupHooks, Web3Hooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Dependencies } from "@_types/hooks";
import { Contract, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
} 


export type Web3State = {
    isLoading: boolean;   //true while loading web3State
    hooks: Web3Hooks;
} & Nullable<Web3Dependencies>;

export const createDefaultState = (): Web3State => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
        hooks: setupHooks({ isLoading: true } as any)
    }
}

export const createWeb3State = ({
    ethereum, provider, contract, isLoading
}: Web3Dependencies) => {
  return {
      ethereum: null,
      provider: null,
      contract: null,
      isLoading: true,
      hooks: setupHooks({ethereum, provider, contract, isLoading})
  }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, provider: providers.Web3Provider): Promise<Contract> => {
   if (!NETWORK_ID){
     return Promise.reject("Network ID not set");
   }
   const res = await fetch(`/contracts/${name}.json`);
   const artifact = await res.json();

   if (artifact.networks[NETWORK_ID].address) {
      const contract = new Contract(artifact.networks[NETWORK_ID].address, artifact.abi, provider);
    return contract;
  }
  else {
    return Promise.reject('Contract not deployed');
  }
}