const express = require('express');
const Contenedor = require('../utils/contenedor');
// const router = express.Router();
const { Router } = express;
const router = new Router();
const objProducts = new Contenedor("db");

router.get('/', async (req, res) => {
    console.log("devuelve todos los productos");
    let products = await objProducts.getAll();
    if (products.length === 0) {
        res.send({
            error: 'Producto no encontrado'
        });
    } else {
        res.send(products);
    }
});

router.get('/:id', async (req, res) => {
    console.log("devuelve un producto según su id");
    // console.log(req.params);
    let product = await objProducts.getById(parseInt(req.params.id));
    res.send(product);
});

router.post('/', async (req, res) => {
    console.log("recibe y agrega un producto, y lo devuelve con su id asignado");
    console.log("req.body", req.body);
    // console.log("req.query", req.query);
    const product = req.body;
    const productResponse = await objProducts.save(product);
    res.send(productResponse);
});

router.put('/:id', async (req, res) => {
    console.log('recibey actualiza un producto según su id');
    const product = req.body;
    const productId = parseInt(req.params.id);
    await objProducts.updateById(product, productId)
    res.send({
        message: "Producto actualizado correctamente"
    });
});

router.delete('/:id', async (req, res) => {
    console.log('Elimina un producto según su id');
    const productId = parseInt(req.params.id);
    await objProducts.deleteById(productId);
    res.send({
        message: `Se elimino correctamente el producto con id = ${productId}`
    });
});

module.exports = router;