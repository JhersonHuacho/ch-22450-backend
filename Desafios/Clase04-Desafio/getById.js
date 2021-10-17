const Contenedor = require("./app-fs-promise-async.js");
const producto = new Contenedor("productos");
producto.getById(1).then(product => console.log("getById() => get del producto \n", product));