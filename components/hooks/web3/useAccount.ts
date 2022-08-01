import { CryptoHookFactory } from "@_types/hooks";
import useSWR from "swr";


//deps => provider, ethereum, contract (web3State)
export const hookFactory: CryptoHookFactory = (deps) => (params) => {
    const swrRes = useSWR("web3/useAccount", async () => {
        console.log(deps);
        console.log(params);
        return "Test User"
    })

    return swrRes;
}

export const useAccount = hookFactory({ethereum: null, provider: null});