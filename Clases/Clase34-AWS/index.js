const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const PORT = process.env.PORT || 3001
AWS.config.update({
    region: 'us-east-1'
});
const sns = new AWS.SNS();
const SNS_TOPIC_ARN = '';

let arr = [];

app.get("/", (req, res) => {
    res.send('TEST API');
});

app.post("/api/user", (req, res) => {
    let { username, password } = req.body;
    let obj = {
        id: Math.random(),
        username,
        password
    }
    arr.push(obj);
    let user = JSON.stringify(obj);

    return sns.publish({
        Message: `nuevo Producto Agregado  ${user}`,
        Subject: "Nuevo producto",
        TopicArn: SNS_TOPIC_ARN
    }).promise().then(data => {
        console.log("se notifico");
        res.json({
            Operation: 'SAVE',
            Message: "SUCCESS",
            Item: req.body
        });
    }).catch(err => {
        console.log("Error al enviar correo ", err);
        res.send("Falla al enviar correo.");
    });
});

app.listen(PORT, () => {
    console.log(`Server ok on PORT ${PORT}`);
});