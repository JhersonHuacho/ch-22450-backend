const express = require('express');
const { Router } = express;
const routerAuth = Router();
const {
    getLogout,
    getLogin,
    getRegister,
    getFaillogin,
    getFailRegister,
    getInfo
} = require('../controllers/auth');

routerAuth.get('/logout', getLogout)
routerAuth.get('/login', getLogin)
routerAuth.get('/register', getRegister);
routerAuth.get('/faillogin', getFaillogin)
routerAuth.get('/failregister', getFailRegister)
routerAuth.get('/info', getInfo)

module.exports = routerAuth;