const express = require('express');
const config = require('./config');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

console.log(process.env.PORT)
console.log(process.env.HOST)


app.listen(config.PORT, () => {
    console.log(`Server run on http://${config.HOST}:${config.PORT}`)
});