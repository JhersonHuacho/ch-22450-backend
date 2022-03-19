const mongoose = require("mongoose");
const { DbClient } = require("./DbClient");
const { Config } = require("../config/config");


class MongoClient extends DbClient {
  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      await this.client.connect(Config.mongo.dbMongoUrl);
      this.client.connection.on('open', () => {
        console.log('Base de datos conectada con exito');
      });
    } catch (error) {
      throw new Error("Error al conectarse a mongodb 1", error)
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      this.client.connection.on('error', () => {
        console.log('Error al conectarse!');
      })
    } catch (error) {
      throw new Error("Error al conectarse a mongodb 1", error)
    }
  }
}

module.exports = MongoClient;