const express = require("express");

const app = express();
const port = process.env.PORT || 3003;

// RUTA
app.get("/", (request, response) => {
  response.send("Hola mundo desde /");
});

app.get("/api", (request, response) => {
  response.json({message: "Hola mundo desde /api"});
});

app.get("/html", (request, response) => {
  response.send("<h1>Hola Mundo desde /html</h1>");
});

app.listen(port, () => {
    console.log(`Server run on port ${port}`);
});