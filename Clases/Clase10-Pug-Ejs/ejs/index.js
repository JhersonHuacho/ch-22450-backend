const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const arr = [
    {
        name: "Moues",
        price: 90
    },
    {
        name: "Cargador",
        price: 100
    },
    {
        name: "Celular",
        price: 70
    }
]

app.get("/", (req, res) => {
    res.render("index", { name: "Carlos", admin: false });
});

app.get("/productos", (req, res) => {
    res.render("productos", {data: arr});
});

app.listen(8080, () => {
    console.log("Server run port 8080");
});