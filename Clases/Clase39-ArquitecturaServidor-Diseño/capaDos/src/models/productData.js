const { db } = require("../../db");
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const S = Sequelize;

const User = db.define(
  'users',
  {
    username: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("user", "moderador"),
      defaultValue: "user",
      allowNull: false
    },
  },
  {
    timestamps: false
  }
)

module.exports = { User };