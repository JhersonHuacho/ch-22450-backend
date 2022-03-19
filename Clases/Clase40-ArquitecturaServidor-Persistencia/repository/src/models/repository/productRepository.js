const { ProductDaos } = require("../daos/productsDaos");

class RepositoryClass {
  constructor() {
    this.productDao = ProductDaos();
  }

  async getAllRepository() {
    let users = await this.productDao.getAll();
    return users;
  }
}

module.exports = { RepositoryClass }