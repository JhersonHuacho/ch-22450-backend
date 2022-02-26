const { recuperarDatos, guardar } = require('../models/productData');

const obtenerDatos = async () => {
  return await recuperarDatos();
}

const createDato = async (dato) => {
  dato.id = Math.random();
  await guardar(dato);
  return dato;
}

module.exports = {
  obtenerDatos,
  createDato
}