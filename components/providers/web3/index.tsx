import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";


type Children = {
    children: any
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Children> = ({children}: any) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());
    useEffect(() => {
        async function initWeb3() {
            try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                    const contract = await loadContract("NftMarket",provider);
                    setWeb3Api(createWeb3State({
                        ethereum: window.ethereum,
                        provider,
                        contract,
                        isLoading: false,
                    }));
            }
            catch (e: any) {
                console.error("Install web3 wallet");
                setWeb3Api((api) => createWeb3State({
                    ...api as any ,
                    isLoading: false,
                })

                )
            }
            
        }
        initWeb3();
    }, [])
     
    return(
        <Web3Context.Provider value={web3Api}>
            {children}
        </Web3Context.Provider>
    )
}



export function useWeb3() {
    const context = useContext(Web3Context);
    if (context === null) {
        throw new Error("useWeb3 must be used within a Web3Provider");
    }
    return context;
}

export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
}

export default Web3Provider;