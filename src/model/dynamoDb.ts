import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-1' });

export const getItemFromDynamoDB = async (tableName: string, key: string): Promise<any> => {
    const params = {
        TableName: tableName,
        Key: {
            id: { S: key },
        },
    };
    const command = new GetItemCommand(params);
    const result = await client.send(command);
    return result.Item;
};
