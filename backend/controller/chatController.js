import dotenv from "dotenv";
dotenv.config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

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

export const getChatByTime = async (req, res) => {
    const chat_id = req.params.chat_id;
    const rawTimestamp = req.params.timestamp;
    const timestamp = parseInt(rawTimestamp);
    if (isNaN(timestamp)) {
        res.status(400).send("Invalid timestamp");
        return;
    }
    const params = {
        TableName: "chat",
        KeyConditionExpression: "#chat_id = :id AND #message_timestamp > :time",
        ExpressionAttributeValues: {
            ":id": chat_id,
            ":time": timestamp,
        },
        ExpressionAttributeNames: {
            "#message_timestamp": "timestamp",
            "#chat_id": "chat_id",
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
        chat_id: `${req.body.chat_id}`,
        message: req.body.message,
        timestamp: created_date,
    };

    try {
        await docClient.send(new PutCommand({ TableName: "chat", Item: item }));
        res.send(item);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
};
