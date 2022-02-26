const { obtenerDatos, createDato } = require("../services/productServices");

const getDatosController = async (req, res) => {
  const datos = await obtenerDatos();
  res.json(datos);
}

const postDatosController = async (req, res) => {
  let dato = req.body;
  await createDato(dato);
  res.json(dato);
}

module.exports = {
  getDatosController,
  postDatosController
}