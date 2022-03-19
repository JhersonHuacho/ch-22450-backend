const { ProductDaos } = require("../models/daos/productsDaos");

class ProductsApi {
  constructor() {
    this.productDao = new ProductDaos();
  }

  async agregar(product) {
    let productNew = await this.productDao.add(product);
    return productNew;
  }

  async buscar(id) {
    let products;
    if (id) {
      products = await this.productDao.getById(id);
    } else {
      products = await this.productDao.getAll();
    }
    return products;
  }

  async borrar(id) {
    let products;
    if (id) {
      products = await this.productDao.deleteById(id);
    } else {
      products = await this.productDao.deleteAll();
    }
    return products;
  }
}