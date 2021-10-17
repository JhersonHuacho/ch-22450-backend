
const Contenedor = require("./app-fs-promise-async.js");


const producto = new Contenedor("productos");
const productoUno = {
  title: "Escuadra",
  price: 123.45,
  thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}

// const productoDos = {
//   title: "Calculadora",
//   price: 234.56,
//   thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
// }

// const productoTres = {
//   title: "'Globo Terráqueo",
//   price: 345.67,
//   thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
// }

producto.save(productoUno);