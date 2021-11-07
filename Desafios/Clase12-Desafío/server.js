const express = require("express");
const exphbs = require("express-handlebars");
const Contenedor = require("./contenedor");
const app = express();
// const routerProducts = require('./routers/productos');
// Server
const http = require('http');
const httpServer = http.createServer(app);
const port = process.env.PORT || 8080;
// Socket
const { Server } = require('socket.io');
const io = new Server(httpServer);
//
const objProducts = new Contenedor("db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(__dirname + "/public"));
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

// Configurar Websockets -Conexión Socket
io.on('connection', (socket) => {
    console.log('usuario conectado');

    // socket.on('saveProduct', async (data) => {
    //     const productPerson = await objProducts.save(data);
    //     const products = await objProducts.getAll();

    //     io.sockets.emit('listProucts', products);
    // });
    socket.on('saveProduct', (data) => {
        io.sockets.emit('listProucts', data);
    });
});

// Routes
// app.use('/api/products', routerProducts);

// app.get('/', (req, res) => {
//     // res.sendFile(__dirname + '/public/index.html');
//     res.render('main');
// });

// app.post('/productos', async (req, res) => {
//     const product = req.body;
//     const productPerson = await objProducts.save(product);
//     // res.render('home', { layout: 'index', data: productPerson });
//     res.redirect('/productos');
// });

app.get('/productos', async (req, res) => {
    // console.log("hola");
    let products = await objProducts.getAll();
    let listExists = false;
    // console.log("products", products);
    if (products.length !== 0) {
        listExists = true;
    }
    // res.render('productos', { layout: 'index', data: products, listExists: listExists });
    res.render('main', { layout: 'index', data: products, listExists: listExists });
    // res.render('productos');
});

// listen
httpServer.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}/productos`);
});