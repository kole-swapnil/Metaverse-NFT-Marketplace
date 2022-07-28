import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { createDefaultState, Web3State } from "./utils";
import { ethers } from "ethers";


type Children = {
    children: any
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Children> = ({children}: any) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());
    useEffect(() => {
        function initWeb3() {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum as any);
                setWeb3Api({
                    ...web3Api,
                    ethereum,
                    isLoading: true,
                    provider
                });
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


export default Web3Provider;