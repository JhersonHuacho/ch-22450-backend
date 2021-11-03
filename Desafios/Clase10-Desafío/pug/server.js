const express = require("express");
const Contenedor = require('./contenedor');
const routerProducts = require('./routers/productos');
const app = express();
const objProducts = new Contenedor('db');
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Estatico
app.use(express.static(__dirname + "/public"));

app.set('views', './views');
app.set('view engine', 'pug');

// Routes
// app.use('/api/products', routerProducts);

// app.get('/form', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.get('/', (req, res) => {
    res.render('index.pug');
});

app.post('/productos', async (req, res) => {
    const product = req.body;
    const productPerson = await objProducts.save(product);
    res.render('index.pug', { data: productPerson });
});

app.get('/productos', async (req, res) => {
    let products = await objProducts.getAll();
    let listExists = false;
    if (products.length !== 0) {
        listExists = true;
    }
    res.render('productos.pug', { data: products, listExists: listExists });
});

// listen
app.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}`);
});