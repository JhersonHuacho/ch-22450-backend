const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// => Cookies Sin Firma
// app.use(cookieParser());
// => Cookies Con Firma (Firmar quiere decir que le encripta)
app.use(cookieParser('misecreto'));

app.get('/setCookieSinFirma', (req, res) => {
    res.cookie('user', 'Francisco');
    res.cookie('password', '123456');

    res.send('Hola Mundo, esta es mi primera cookie, setCookieSinFirma');
})

app.get("/getCookiesSinFirma", (req, res) => {
    console.log('getCookiesSinFirma');
    console.log(req.cookies);
    console.log(req.cookies.user);
    console.log(req.cookies.password);

    res.send('Hola de nuevo, getCookiesSinFirma');
})

app.get("/setCookieConFirma", (req, res) => {
    console.log('Hola, setCookieConFirma');

    res.cookie('user', 'Francisco', { signed: true });
    res.cookie('password', '123456789', { signed: true });

    res.send('Hola Mundo, esta es mi primera cookie. setCookieConFirma');
})

app.get("/setCookieConFirmaConExpiracion", (req, res) => {
    console.log('Hola, setCookieConFirmaConExpiracion');

    res.cookie('user', 'Francisco', { signed: true, maxAge: 3000 });
    res.cookie('password', '123456789', { signed: true, maxAge: 3000 });

    res.send('Hola Mundo, esta es mi primera cookie. setCookieConFirmaConExpiracion');
})

app.get("/getCookiesConFirma", (req, res) => {
    console.log('getCookiesConFirma');
    console.log(req.signedCookies);
    console.log(req.signedCookies.user);
    console.log(req.signedCookies.password);

    res.send('Hola de nuevo, getCookiesConFirma');
})

app.get('/createCookies', (req, res) => {
    const user = req.query.user;
    const password = req.query.password;
    const time = req.query.time || 3000;

    if (user === 'francisco' && password === '123') {
        // res.cookie('nombre', user, { maxAge: Number(time) });
        // res.cookie('password', password, { maxAge: +time });
        res.cookie('nombre', user, { signed: true, maxAge: Number(time) });
        res.cookie('password', password, { signed: true, maxAge: +time });
        res.send('Cookies creadas');
    } else {
        res.send('No se pudo crear la cookie');
    }
})

app.get('/eliminarCookie', (req, res) => {
    console.log('eliminarCookie');
    res.clearCookie('user')
        .clearCookie('password')
        .send('Cookie eliminada, eliminarCookie');
})

app.listen(3003, () => {
    console.log('server run');
});