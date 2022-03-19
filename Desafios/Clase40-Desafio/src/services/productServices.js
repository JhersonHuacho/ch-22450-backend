const Product = require('../models/Products');

const obtenerProductos = async () => {
  let products = await Product.find();
  return products;
}

const guardarProducto = async (newProduct) => {
  const saveProduct = await newProduct.save();
  return saveProduct;
}

module.exports = {
  obtenerProductos,
  guardarProducto
}