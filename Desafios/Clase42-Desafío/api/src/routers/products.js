const express = require('express');
const { getProducts, postProducts } = require('../controllers/products');
const { Router } = express;
const routerProduct = Router();

routerProduct.get('/', getProducts);
routerProduct.post('/', postProducts);

module.exports = routerProduct;