import { Address, Contract, Cell, beginCell,  contractAddress, ContractProvider, Sender, SendMode } from "@ton/core";

export type MainContractConfig = { 
    number: number,
    recent_address: Address,
    owner_address: Address
};

export function dataCellMAinContractConfig(config: MainContractConfig){
    return beginCell()
        .storeUint(config.number,32)
        .storeAddress(config.recent_address)
        .storeAddress(config.owner_address)
        .endCell();
};

export class MainContract implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: {
            code: Cell,
            data: Cell
        },
    ) {};

    static createMainContractFromConfig(
        config: MainContractConfig,
        code: Cell,
        workchain = 0 ){
            const data = dataCellMAinContractConfig(config);
            const init = {
                code: code,
                data: data };
            
            const address = contractAddress(workchain, init);
            return new MainContract(address, init);
    };

    async sendIncrementToContract(
        provider: ContractProvider,
        sender: Sender,
        value: bigint,
        increment: number) {
            const msg_body = beginCell()
                .storeUint(1, 32)
                .storeUint(increment, 32)
                .endCell();
            await provider.internal(sender, {
                value, 
                sendMode: SendMode.PAY_GAS_SEPARATELY,
                body: msg_body
            });
    };

    async sendDepositToContract(
        provider: ContractProvider,
        sender: Sender,
        value: bigint ) {
            const msg_body = beginCell()
                .storeUint(2, 32)
                .endCell();
            await provider.internal(sender, {
                value,
                sendMode: SendMode.PAY_GAS_SEPARATELY,
                body: msg_body
            });
    };

    async sendDepositToContractEmptyMsg(
        provider: ContractProvider,
        sender: Sender,
        value: bigint) {
            const msg_body = beginCell().endCell();
            await provider.internal(sender, {
                value,
                sendMode: SendMode.PAY_GAS_SEPARATELY,
                body: msg_body
            });
    };

    async sendTransferOfFundsFromaSmartContractAccounttoAnotherContractAccount(
        provider: ContractProvider,
        sender: Sender,
        value: bigint,
        amount_transfer: bigint) {
            const msg_body = beginCell()
                .storeUint(3, 32)
                .storeCoins(amount_transfer)
                .endCell();
            await provider.internal(sender, {
                value,
                sendMode: SendMode.PAY_GAS_SEPARATELY,
                body: msg_body
            });
    };

    async gettingDataFromTheSmartContractStorage(provider: ContractProvider) {
        const {stack} = await provider.get("get_smart_contract_data_from_c4_storage", []);
        return {
            number: stack.readNumber(),
            recent_address: stack.readAddress(),
            owner_address: stack.readAddress()
        };
    };

    async gettingaSmartContractBalance(provider: ContractProvider) {
        const {stack} = await provider.get("get_a_smart_contract_balance", []);
        return {
            balance: stack.readNumber()
        };
    };

    async sendDeployTheContract(
        provider: ContractProvider, 
        sender: Sender, 
        value: bigint) {
            const msg_body = beginCell().storeUint(2, 32).endCell();
            await provider.internal(sender, {
                value,
                sendMode: SendMode.PAY_GAS_SEPARATELY,
                body: msg_body
            });
    };

}