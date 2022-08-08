import { CryptoHookFactory } from "@_types/hooks";
import { useEffect } from "react";
import useSWR from "swr";

type useAccountResponse = {
    connect: () => void,
    isLoading: boolean,
    isInstalled: boolean,
}
type AccountHookFactory = CryptoHookFactory<string, useAccountResponse> 
export type UseAccountHook = ReturnType<AccountHookFactory>


//deps => provider, ethereum, contract (web3State)
export const hookFactory: AccountHookFactory = ({ provider, ethereum, isLoading }) => () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
        provider ? "web3/useAccount" : null,
        async () => {
            const accounts = await provider!.listAccounts();
            if (!accounts || accounts.length === 0) {
                throw "Connect to wallet"
            }
            return accounts[0];
        }, {
            revalidateOnFocus: false,
        }
    )

    useEffect(() => {
        ethereum?.on("accountsChanged", handleAccountsChanged);
        return () => {
            ethereum?.removeListener("accountsChanged", handleAccountsChanged);
        }
    })

    const handleAccountsChanged = (...args: unknown[]) => {
        console.log("args", args);
        const accounts = args[0] as string[];
        if (accounts.length === 0) {
            console.log("connect to wallet");
        } else {
            if (accounts[0] !== data) {
                console.log("account changed", accounts[0]);
                mutate(accounts[0]);
            } 
        }
        console.log("acc changed")
    }
 
    const connect = async () => {
        try {
            ethereum?.request({ method: "eth_requestAccounts" });
        } catch(e) {
            console.error(e);
        }
    }

    return {
        ...swr,
        data,
        isValidating,
        isLoading: isLoading as boolean ,
        isInstalled: ethereum?.isMetaMask || false,
        mutate, 
        connect
    };
}

