const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // res.status(301).send("hello world");
  res.send("heelo wordl /");
});

app.get("/api", (req, res) => {
  res.send("heelo wordl desde /api");
});

app.listen(3002, () => {
  console.log("server run on port 3002");
});