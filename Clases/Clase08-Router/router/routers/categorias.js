const express = require("express");
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  res.send("Hello world desde categorias.js /");
});

router.get("/getAll", (req, res) => {
  res.send("Hello world desde categorias.js /getAll");
});

module.exports = router;