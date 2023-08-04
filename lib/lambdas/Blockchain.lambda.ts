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
            contractAddress: "0x60e4d786628fea6478f785a6d7e704777c86a7c6"
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
