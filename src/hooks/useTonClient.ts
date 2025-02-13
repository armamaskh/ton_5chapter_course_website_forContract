import { TonClient4 } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";

export function useTonClient(){
    return useAsyncInitialize(
        async () => new TonClient4({
            endpoint: await getHttpV4Endpoint({network: "testnet"}) })
    );
}