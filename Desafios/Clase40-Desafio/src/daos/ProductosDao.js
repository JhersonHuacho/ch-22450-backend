const Product = require('../models/Products');
class ProductosDaos {
  async getAll() {
    let products = await Product.find();
    return products;
    //throw "Falta implementar el metodo GetAll"
  }
  async getById(id) {
    throw "Falta implementar el metodo GetById"
  }
  async add(data) {
    const saveProduct = await newProduct.save();
    return saveProduct;
    //throw "Falta implementar el metodo add"
  }
  async deleteById(id) {
    throw "Falta implementar el metodo deleteById"
  }
  async deleteAll() {
    throw "Falta implementar el metodo deleteAll"
  }
  async updateById() {
    throw "Falta implementar el metodo updateAll"
  }
  async updateAll() {
    throw "Falta implementar el metodo updateAll"
  }
}


module.exports = { ProductosDaos }