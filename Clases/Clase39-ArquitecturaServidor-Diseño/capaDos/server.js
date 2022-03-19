const express = require("express");
const { db } = require("./db");
const routerDatos = require("./src/routers/productsRoute");
const app = express();

app.use("/api/datos", routerDatos);
app.use(express.json());

app.listen(8080, () => {
  console.log("Server OK");
  db.sync({ force: false })
    .then(() => {
      console.log("Base de datos conectado.");
    })
    .catch(err => {
      console.log("Error de conexión a la BD => ", err);
    })
});
