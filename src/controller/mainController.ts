import express, { Request, Response } from 'express';
import { getItemFromDynamoDB } from '../model/dynamoDb';

const router = express.Router();

const tableName = 'nodeServiceExample';

router.get('/getDynamoDbItem', async (req, res) => {
    try {
        const key = extractKeyFromRequest(req);
        console.log('key: ' + key)
        const item = await getItemFromDynamoDB(tableName, key);
        res.json({ item });
    } catch (error: any) {
        handleError(res, error);
    }
});

const extractKeyFromRequest = (req: Request): string => {
    const primaryKey = req.query.key as string;
    if (!primaryKey) {
        throw new Error('Missing or invalid "key" parameter.');
    }
    return primaryKey;
};

const handleError = (res: Response, error: Error, statusCode: number = 500): void => {
    console.error(`Error: ${error.message}`);
    res.status(statusCode).json({ error: error.message });
};

export default router;
