const { Sequelize } = require("sequelize");

const db = new Sequelize("clase_39", "root", "123456", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = { db };