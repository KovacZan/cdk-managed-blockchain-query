import { APIGatewayProxyHandler } from "aws-lambda";
import {
    GetTokenBalanceCommand,
    ManagedBlockchainQueryClient
} from "@aws-sdk/client-managedblockchain-query";

const handler: APIGatewayProxyHandler = async request => {
    const client = new ManagedBlockchainQueryClient({region: "us-east-1"});

    const command = new GetTokenBalanceCommand({
        ownerIdentifier: {
            address: "0x51ba9d1d64c6278bfbdf3c073d5afbc6c372a939"
        },
        tokenIdentifier: {
            network: "ETHEREUM_MAINNET",
            contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7"
        }
    });

    try {
        const data = await client.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 200,
            body: JSON.stringify(error)
        };
    }

};

export { handler };
