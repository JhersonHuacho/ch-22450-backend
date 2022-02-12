const express = require('express');
const AWS = require('aws-sdk');
const app = express();

AWS.config.update({
    region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "after-coder-table";

const scanDynamo = async (scanParams) => {
    try {
        let dynamoData = await dynamodb.scan(scanParams).promise();
        const items = dynamoData.Items;
        return items
    } catch (error) {
        throw new Error(error);
    }
}

app.get("/api/usuarios", async (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME
        }
        let usuarios = await scanDynamo(params);
        res.json(usuarios);
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/usuarios', (req, res) => {
    try {
        const params = {
            TableName: TABLE_NAME,
            Item: req.body
        }

        dynamodb.put(params).promise()
            .then(() => {
                console.log('Se guardo!')
                let body = {
                    Operation: 'SAVE',
                    Message: 'SUCCESS',
                    Item: req.body
                }
                res.json(body);
            })
            .catch((err) => {
                console.log('Ocurrio un error: ', console.error(err))
            })

    } catch (error) {
        console.log(error);
    }
});

app.listen(3001, () => {
    console.log(`Server run on port 3001`);
});