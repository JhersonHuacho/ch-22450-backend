const express = require("express");
const app = express();
const port = 3002;
let arr = [];
// Middleware propios de express
app.use(express.json());
app.use(express.urlencoded({extends: false}));

/**
 * Middleware a nivel de aplicación. Middleware personalizados
 */
app.use(function(req, res, next) {
    console.log("Middleware a nivel de aplicación");
    next();
});

/**
 * Middleware a nivel de rutas. Middleware personalizados
 */
function middlewareOne(req, res, next) {
    console.log("Middleware a nivel de rutas");
    req.cambioReq = "nueva propiedad";
    next();
};

// Estáticos
app.use("/static", express.static(__dirname + "/public"));

app.get("/", middlewareOne , (req, res) => {
    console.log(req.cambioReq);
    res.send("Hola mundo desde el api /");
});

app.get("/getAll", (req, res) => {
    res.send({data: arr});
});

app.get("/file", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/public/form.html");
});

app.post("/save", (req, res) => {
    console.log(req.body);
    arr.push(req.body);
    res.send("Información enviada");
});

app.listen(port, () => {
    console.log("Server run port " + port);
});