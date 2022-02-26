const express = require('express');
const passport = require('passport');
const { getProductTest, getRandom, getProductos } = require('../controllers/api');
const { Router } = express;
const routerApi = new Router();

// ==> Routes API TEST
routerApi.get('/productos-test', getProductTest)
routerApi.get('/randoms', getRandom)
routerApi.get('/productos', getProductos);
// =>
routerApi.post('/login', passport.authenticate('local-login', {
  successRedirect: '/productos',
  failureRedirect: '/auth/faillogin'
}))

routerApi.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/auth/login',
  failureRedirect: '/auth/failregister'
}))



module.exports = routerApi;