const express = require("express");
const exphbs = require("express-handlebars");
const Contenedor = require("./contenedor");
const app = express();
const routerProducts = require('./routers/productos');
const port = 8080;
const objProducts = new Contenedor("db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// app.use("/static", express.static(__dirname + "/public"));

// set
app.set("views", "./views");
app.set("view engine", "hbs");
app.engine(
    'hbs',
    exphbs({
        extname: 'hbs',
        layoutsDir: __dirname + '/views/layouts',
        defaultLayout: 'index',
        partialsDir: __dirname + '/views/partials'
    })
);

// Routes
// app.use('/api/products', routerProducts);

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html');
    res.render('home');
});

app.post('/productos', async (req, res) => {
    const product = req.body;
    const productPerson = await objProducts.save(product);
    res.render('home', { layout: 'index', data: productPerson });
});

app.get('/productos', async (req, res) => {
    // console.log("hola");
    let products = await objProducts.getAll();
    let listExists = false;
    // console.log("products", products);
    if (products.length !== 0) {
        listExists = true;
    }
    res.render('productos', { layout: 'index', data: products, listExists: listExists });
    // res.render('productos');
});

// listen
app.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}`);
});