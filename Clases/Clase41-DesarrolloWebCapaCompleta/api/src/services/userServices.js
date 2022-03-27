const { userDao } = require("../models/index");

const getUserServices = async () => {
  return await userDao.listAll();
}

const getUserByIdServices = async (id) => {
  return await userDao.list(id);
}

const createUserServices = async (data) => {
  return await userDao.guardar(data);
}


module.exports = {
  getUserServices,
  getUserByIdServices,
  createUserServices
}
