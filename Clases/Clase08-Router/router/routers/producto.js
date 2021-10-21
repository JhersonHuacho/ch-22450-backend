const express = require("express");
const { Router } = express;
const router = new Router();

let arr = [];

router.get("/", (req, res) => {
  res.send("Hello world desde productos.js /");
});

router.get("/getAll", (req, res) => {
  // res.send("Hello world desde productos.js /getAll");
  res.send({data: arr});
});

router.post("/", (req, res) => {
  console.log(req.body);
  arr.push(req.body);
  res.send("post desde products: El producto se guardo correctamente");
})

module.exports = router;