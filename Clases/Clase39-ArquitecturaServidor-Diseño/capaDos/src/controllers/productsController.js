const { obtenerDatos, createData } = require("../services/servicesProducts");

const getDatosController = async (req, res) => {
  let data = await obtenerDatos();
  res.json(data);
}

const postDatosController = async (req, res) => {
  let data = req.body;

  let response = await createData(data);
  res.json(response);
}

module.exports = {
  getDatosController,
  postDatosController
}