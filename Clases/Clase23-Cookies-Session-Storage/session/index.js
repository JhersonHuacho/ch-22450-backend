const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'misecreto',
    resave: true,
    saveUninitialized: true
}));

function authMiddleware(req, res, next) {
    if (req.session.user === 'Francisco' && req.session.admin) {
        return next();
    }
    return res.status(401).send('Error de autorización');
}

app.get('/', (req, res) => {
    console.log(req.session);
    req.session.usuario = 'Francisco';
    req.session.password = '123456';
    console.log(req.session);

    res.send({ se: req.session });
});

app.get('/getSession', (req, res) => {
    console.log('/getSession')
    console.log(req.session);
    res.send({ se: req.session });
});

// => Login
app.get('/login', (req, res) => {
    const { username, password } = req.query;
    if (username !== 'Francisco' || password !== '123456') {
        return res.send('login failed');
    }

    req.session.user = username;
    req.session.admin = true;

    res.send('Login success!');
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error en Logout');
        }
        res.send('Logout OK!');
    });
})

app.get('/privado', authMiddleware, (req, res) => {
    res.send('Si esta aca, es porque estas autorizado');
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
    console.log('Server ok')
});