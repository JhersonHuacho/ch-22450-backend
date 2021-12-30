const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();
const app = express();

// ttl => time to live (tiempo de vida)
app.use(
    session({
        store: new RedisStore({
            host: "localhost",
            port: 6379,
            client: redisClient
        }),
        secret: 'misecreto',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 3000
        }
    })
);

redisClient.on('ready', () => {
    console.log('Redis Ok!!')
})

app.get('/', (req, res) => {
    req.session.usuario = "Francisco"
    req.session.password = "123456"
    res.send('Todo OK')
})
// => Resolviendo el Ejercicio de la diapositiva
app.get('/root', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`Haz visitado el sitio ${req.session.contador} veces!`)
    } else {
        req.session.contador = 1
        res.send('Bienvenido')
    }
})


app.listen(3003, () => {
    console.log("Server run on port 3003");
})