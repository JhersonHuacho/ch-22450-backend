const express = require("express");
const app = express();
const array = require("./arr");

app.use(express.json());

// GET
app.get("/", (req, res) => {
  res.send("Hello World desde /");
});

app.get("/api", (req, res) => {
  res.send("Hello World desde /api ");
});

app.get("/dosapi", (req, res) => {
  console.log(req);
  let obj = {
    name: req.query.name,
    lastName: req.query.lastName,
    id: 5
  }
  array.push(obj);
  res.send("Hello World desde /api " + JSON.stringify(req.query));
});

app.get("/users", (req, res) => {
  res.send(array);
});

// Parametros URL
app.get("/:id", (req, res) => {
  res.send("Hello World desde /:id " + JSON.stringify(req.params));
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Este es un post desde /");
})

app.listen(3002, () => {
  console.log("Server run on port 3002");
});