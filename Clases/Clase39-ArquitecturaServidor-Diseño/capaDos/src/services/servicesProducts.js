const { User } = require("../models/productData");

const obtenerDatos = async () => {
  const users = await User.findAll();
  return users;
}

const createData = async (data) => {
  const { username, password } = data;
  const user = await User.findOne({
    where: {
      username: username
    }
  })

  if (!user) {
    const userNew = await User.create({
      username,
      password
    })
    return userNew;
  }

  return "Usuario ya existe";
}

module.exports = {
  obtenerDatos,
  createData
}