const express = require("express");
const Contenedor = require("./contenedor");
const app = express();
const objProducts = new Contenedor('db');
// const routerProducts = require('./routers/productos');
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Estatico
app.use(express.static(__dirname + "/public"));

// Configuramos EJS como motor de plantilla
app.set('view engine', 'ejs');
app.set("views", "./views");


// Routes
// app.use('/api/products', routerProducts);

// app.get('/form', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html');
    res.render('pages/index');
});

app.get('/productos', async (req, res) => {
    // console.log("hola");
    let products = await objProducts.getAll();
    let listExists = false;
    // console.log("products", products);
    if (products.length !== 0) {
        listExists = true;
    }
    res.render('productos', { data: products, listExists: listExists });
    // res.render('productos');
});

app.post('/productos', async (req, res) => {
    const product = req.body;
    const productPerson = await objProducts.save(product);
    // res.render('pages/index', {data: productPerson });
    res.redirect("/");
});

// listen
app.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}`);
});