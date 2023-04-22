import dotenv from "dotenv";
dotenv.config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    PutCommand,
    DeleteCommand,
    ScanCommand,
    BatchWriteCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });

export const getChat = async (req, res) => {
    const chat_id = req.params.chat_id;
    const params = {
        TableName: "chat",
        KeyConditionExpression: "chat_id = :id",
        ExpressionAttributeValues: {
            ":id": chat_id,
        },
    };
    try {
        const data = await docClient.send(new QueryCommand(params));
        res.send(data.Items);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};

export const addMessage = async (req, res) => {
    const created_date = Date.now();
    const user = req.user;
    const item = {
        name: `${user.firstname_en} ${user.lastname_en}`,
        user_id: user.uid,
        img: user.profile_pict,
        ...req.body,
        timestamp: created_date,
    };

    // You should change the response below.
    try {
        await docClient.send(new PutCommand({ TableName: "chat", Item: item }));
        res.send(item);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
