const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

// ttl => time to live (tiempo de vida)
app.use(session({
    store: new FileStore({ path: './sessions', ttl: 300 }),
    secret: 'misecreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3000
    }
}));

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
// 00:43:28
app.listen(3003, () => {
    console.log('Server ok')
});