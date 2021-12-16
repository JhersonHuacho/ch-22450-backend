const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('misecreto'));

app.get("/", (req, res) => {
    console.log('Hola');
    res.cookie('user', 'Francisco', { signed: true, maxAge: 3000 });
    res.cookie('password', '123456', { signed: true, maxAge: 3000 });

    res.send('Hola Mundo, esta es mi primera cookie');
})

app.get('/createCookies', (req, res) => {
    const user = req.query.user;
    const password = req.query.password;
    const time = req.query.time || 1000;

    if (user === 'francisco' && password === '123') {
        res.cookie('nombre', user, { maxAge: Number(time) });
        res.cookie('password', password, { maxAge: +time });
        res.send('Cookies creadas');
    } else {
        res.send('No se pudo crear la cookie');
    }
})

app.get("/getCookies", (req, res) => {
    console.log('getCookies');
    console.log(req.signedCookies.user);
    console.log(req.signedCookies.password);

    res.send('Hola de nuevo');
})

app.get('/eliminarCookie', (req, res) => {
    res.clearCookie('user').clearCookie('password').send('Cookie eliminada');
})

app.listen(3003, () => {
    console.log('server run');
});