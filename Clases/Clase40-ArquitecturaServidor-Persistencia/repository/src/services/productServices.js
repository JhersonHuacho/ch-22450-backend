const { ProductDaos } = require("../models/daos/productsDaos");
const { RepositoryClass } = require("../models/repository/productRepository");

class ProductsApi {
  constructor() {
    this.productDao = new ProductDaos();
    this.productRepository = new RepositoryClass();
  }

  async buscarTodos() {
    let users = await this.productRepository.getAllRepository();
    return users;
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