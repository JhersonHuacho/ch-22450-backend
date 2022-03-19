const mongoose = require("mongoose");
const { Config } = require("../config/config");

class MymongoClient {
  constructor() {
    this.conected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      this.client.connect(Config.host + Config.name);
      console.log("Base de datos conectada!!");
    } catch (error) {
      console.log("Error:", error);
      throw "error al conectar";
    }
  }

  async disconnect() {
    try {
      this.client.close();
      console.log("Base de datos desconectada!!");
    } catch (error) {
      console.log("Error:", error);
      throw "error al desconectar";
    }
  }
}

module.exports = { MymongoClient }