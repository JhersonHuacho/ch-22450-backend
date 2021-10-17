const express = require("express");
const app = express();
const Contenedor = require("./contenedor");
const port = 8080;

const producto = new Contenedor("productos");

function productRandom(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
  // setTimeout(() => {
  //   console.log("random", random);
  // }, 3000);
}

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/productos", async (req, res) => {
  let listProducts = await producto.getAll();
  res.json(listProducts);
});

app.get("/productoRandom", async (req, res) => {
  let listProducts = await producto.getAll();
  const idProduct = productRandom(1, listProducts.length);
  // console.log("idProduct", idProduct);
  let product = await producto.getById(idProduct);
  res.json(product);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);  
});