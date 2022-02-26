const { faker } = require('@faker-js/faker');
const knex = require('../config/knex/db');
const Product = require('../models/Products');

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
  res.json(products);
}

module.exports = {
  getProductTest,
  getRandom,
  getProductos
}