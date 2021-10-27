const express = require("express");
const app = express();
const routerProducts = require('./routers/productos');
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Estatico
app.use("/static", express.static(__dirname + "/public"));

// Routes
app.use('/api/products', routerProducts);

// app.get('/form', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// listen
app.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}`);
});