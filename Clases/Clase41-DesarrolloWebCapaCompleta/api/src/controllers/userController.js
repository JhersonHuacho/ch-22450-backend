
const { getUserByIdServices, getUserServices, createUserServices } = require("../services/userServices");

const getAllUsers = async (req, res) => {
  try {
    const users = await getUserServices();
    res.json(users);
  } catch (error) {
    console.log("Error al obtener usuarios", error);
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdServices(id);
    res.json(user);
  } catch (error) {
    console.log("Error al obtener usuario", error);
  }
}

const createUsers = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    userData.id = Math.random();

    const userSave = await createUserServices(userData);
    res.json({
      message: "User created",
      data: userSave
    });
  } catch (error) {
    console.log("Error al obtener usuarios", error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUsers
}