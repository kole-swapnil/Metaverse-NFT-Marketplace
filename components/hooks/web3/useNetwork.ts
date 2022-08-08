import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS: {[k:string]: string} = {
    '1': "Mainnet",
    '3': "Ropsten",
    '4': "Rinkeby",
    '1337': "Ganache"
}

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAINID as string;
const targetNetwork = NETWORKS[targetId];
console.log("targetNetwork", targetId);

type useNetworkResponse = { 
    isLoading: boolean,
    isSupported: boolean,
    targetNetwork: string,
}
type NetworkHookFactory = CryptoHookFactory<string, useNetworkResponse> 
export type UseNetworkHook = ReturnType<NetworkHookFactory>


//deps => provider, ethereum, contract (web3State)
export const hookFactory: NetworkHookFactory = ({ provider, isLoading }) => () => {
    const { data, isValidating, ...swr } = useSWR(
        provider ? "web3/useNetwork" : null,
        async () => {
            const chainId = (await provider!.getNetwork()).chainId;
            const networkName = (await provider!.getNetwork()).name;
            console.log("chainId", chainId);
            console.log("networkName", networkName);
            if (!chainId) {
                throw "Connect to network"
            }

            return NETWORKS[chainId];
        }, {
            revalidateOnFocus: false,
        }
    )

    return {
        ...swr,
        data,
        isValidating,
        targetNetwork,
        isSupported: data == targetNetwork,
        isLoading: isLoading as boolean,

    };
}

