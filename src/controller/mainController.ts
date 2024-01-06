import express, { Request, Response } from 'express';
import { getItemFromDynamoDB } from '../model/dynamoDb';

const router = express.Router();

const tableName = 'nodeServiceExample';

const getDynamoDbItem = async (req: Request, res: Response) => {
    try {
        const key = extractKeyFromRequest(req);
        const item = await getItemFromDynamoDB(tableName, key);
        res.json({ item });
    } catch (error: any) {
        handleError(res, error);
    }
};

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

router.get('/getDynamoDbItem', getDynamoDbItem);

export default router;
