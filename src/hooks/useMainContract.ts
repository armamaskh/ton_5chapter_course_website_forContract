import { useEffect, useState } from "react";
import { Address,  OpenedContract, toNano } from "@ton/core";

import { MainContract } from "../wrappers/MainContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";

export function useMainContract() {
    const client = useTonClient();
    const {sender} = useTonConnect();

    var [ContractData, setContractData] = useState<null | {
        number: number,
        recent_address: Address,
        owner_address: Address } >();
    var [ContractBalance, setContractBalance] = useState<null | {
        balance: number } >();
    
    const mainContract = useAsyncInitialize( async () => {
        if(!client) return;
        const contract = new MainContract(
            Address.parse("EQDKS0Eo4fKFEnPdxD1VpDK3VQ5ngfp9VNshj4FxorYfT_d-"));
        return client.open(contract) as OpenedContract<MainContract>;
    }, [client]);


    const sleep = (time: number) => new Promise( (resolve) => setTimeout(resolve, time) )

    useEffect( () => {
        async function getValue() {
            if(!mainContract) return;

            setContractBalance(null);
            setContractData(null);

            const data = await mainContract.gettingDataFromTheSmartContractStorage();
            setContractData({
                number: data.number,
                recent_address: data.recent_address,
                owner_address: data.owner_address
            });
            const balance = await mainContract.gettingaSmartContractBalance();
            setContractBalance({
                balance: balance.balance
            }); 
            
            await sleep(5000);
            getValue();
        };
        getValue();
    }, [mainContract])
    return {
        contract_address: mainContract?.address.toString({testOnly: true}),
        ...ContractData,
        ...ContractBalance,  
        sendIncrement: async () => {
            return mainContract?.sendIncrementToContract(sender, toNano(0.01), 2)},
        sendDeposite: async () => {
            mainContract?.sendDepositToContract(sender, toNano(0.05))},
        sendWithdrawal: async () => {
            mainContract?.sendTransferOfFundsFromaSmartContractAccounttoAnotherContractAccount(sender, toNano(0.01), toNano(0.03))
        }
    };

};