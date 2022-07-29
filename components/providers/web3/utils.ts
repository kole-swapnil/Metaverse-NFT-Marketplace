import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
    ethereum?: MetaMaskInpageProvider | null,
    provider?: providers.Web3Provider | null,
    contract?: Contract | null,
}

export type Web3State = {
    isLoading: boolean,   //true while loading web3State
} & Web3Params;

export const createDefaultState = (): Web3State => {
    return {
        ethereum: null,
        provider: null,
        contract: null,
        isLoading: true,
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