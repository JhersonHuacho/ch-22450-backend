const { ProductosDaos } = require("../daos/ProductosDao");

class RepositoryClass {
  constructor() {
    this.productDao = new ProductosDaos();
  }

  async getAllRepository() {
    let users = await this.productDao.getAll();
    return users;
  }
}

module.exports = { RepositoryClass }