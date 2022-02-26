let data = [];

const recuperarDatos = () => {
  return data;
}

const guardar = (data) => {
  data.push(data);
}

module.exports = {
  recuperarDatos,
  guardar
};