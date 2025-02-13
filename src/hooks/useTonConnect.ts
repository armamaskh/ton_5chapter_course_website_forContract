import { Sender, SenderArguments } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";


export function useTonConnect(): {sender: Sender, connected: boolean} {
    const [tonConnectUI] = useTonConnectUI();

    return{
        sender: {
            send: async (args: SenderArguments) => {               // const add = (a: number, b: number) => a + b;
                tonConnectUI.sendTransaction({
                    messages: [{
                        address: args.to.toString(),
                        amount: args.value.toString(10),
                        payload: args.body?.toBoc().toString("base64") }
                    ],
                validUntil: Date.now() + 5 * 60 * 1000 });
            },
        },

        connected: tonConnectUI.connected,

    };
}
