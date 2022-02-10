const express = require('express');
const { getProductTest, getRandom, getProductos } = require('../controllers/api');
const { Router } = express;
const routerApi = new Router();

routerApi.get('/productos-test', getProductTest)

// ==> Routes API TEST
routerApi.get('/randoms', getRandom)

routerApi.get('/productos', getProductos);


module.exports = routerApi;