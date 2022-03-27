const { faker } = require('@faker-js/faker');
const knex = require('../config/knex/db');
const Product = require('../models/Products');
const { obtenerProductos, guardarProducto } = require("../services/productServices");

const getProductTest = (req, res) => {
  let arrProducts = [];

  for (let i = 1; i <= 5; i++) {
    arrProducts.push({
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl()
    });
  }

  res.json(arrProducts);
}

const getRandom = (req, res) => {
  console.log('req.query =>', req.query)
  const min = 1;
  const max = req.query.cant === undefined ? 100000000 : Number(req.query.cant);
  const child = fork('../utils/calculo.js', [min, max]);
  child.send('start');

  // res.json({ data: objRandom })

  child.on('message', (objRandom) => {
    // console.log('objRandom server.js', objRandom)
    res.json({ data: objRandom });
  })
}

const getProductosKnex = (req, res) => {
  knex
    .from('product')
    .select('id', 'title', 'price', 'thumbnail')
    .then(respone => {
      // console.log('respone', respone);
      res.json(respone)
    })
}

const getProductos = async (req, res) => {
  let products = await Product.find();
  res.status(200).json(products);
}

const postProducts = async (req, res) => {
  try {
    // console.log('req => ', req);
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    })

    const saveProduct = await guardarProducto(newProduct);
    console.log("Se registro correctamente el producto");
    //return saveProduct;
    res.status(201).json({
      message: "Producto guardao correctamente",
      data: saveProduct
    })
  } catch (error) {
    console.log('Error al guardar => ', error);
  }
}

const updateProduct = async (req, res) => {
  try {
    const productUpdate = await Product.findOneAndUpdate({
      _id: req.body.id
    }, {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    });
    //return productUpdate;
    res.status(200).json({
      message: "Producto actualizado correctamente",
      data: productUpdate
    })
  } catch (error) {
    console.log(error);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productDelete = await Product.findOneAndDelete({ _id: req.params.id });
    //return productDelete;
    res.status(200).json({
      message: "Producto eliminado correctamente",
      data: []
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProductTest,
  getRandom,
  getProductos,
  postProducts,
  updateProduct,
  deleteProduct
}