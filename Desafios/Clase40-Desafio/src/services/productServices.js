const { ProductosDaos } = require("../daos/ProductosDao");

class ProductosApi {
  constructor() {
    this.productosDao = new ProductosDaos();
  }

  async getAll() {
    const productos = await this.productosDao.getAll();
    return productos;
  }

  async add(newProduct) {
    const productoAgregado = new this.productosDao.add(newProduct);
    return productoAgregado;
  }
}

module.exports = { ProductosApi }

// const Product = require('../models/Products');

// const obtenerProductos = async () => {
//   let products = await Product.find();
//   return products;
// }

// const guardarProducto = async (newProduct) => {
//   const saveProduct = await newProduct.save();
//   return saveProduct;
// }

// module.exports = {
//   obtenerProductos,
//   guardarProducto
// }
