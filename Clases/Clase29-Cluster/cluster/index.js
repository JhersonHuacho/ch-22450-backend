const express = require('express');
const cluster = require('cluster');
const numCPUS = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUS; i++) {
        // worker
        cluster.fork()
    }
    cluster.on('exit', () => {
        console.log(`Process ${process.pid} died`)
    })
} else {
    const app = express();

    app.get("/", (req, res) => {
        for (let i = 0; i <= 5e9; i++) {

        }
        res.send(`Hello world ${process.pid}`)
    })

    app.get('/hello', (req, res) => {
        res.send(`Hello world ${process.pid}`)
    })

    app.listen(3002, () => {
        console.log(`Server ${process.pid} http://localhost:3002`)
    })
}

