const express = require("express");
const app = express();
const port = 3002;
const productsRouters = require("./routers/producto");
const categoriesRouters = require("./routers/categorias");

app.use(express.json());

// Routes
app.use("/products", productsRouters);
app.use("/categorias", categoriesRouters);

app.listen(port, () => {
    console.log("Server run port " + port);
});