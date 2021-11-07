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
const objMensajes = new Contenedor("db-mensajes");
const arrMensajes = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(__dirname + "/public"));

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
io.on('connection', async (socket) => {
    console.log('usuario conectado');

    const mensajes = await objMensajes.getAll();
    io.sockets.emit('listarMensajes', mensajes);
    
    socket.on('saveProduct', async (data) => {
        io.sockets.emit('listProducts', data);
    });
    
    socket.on('sendMensaje', async (data) => {
        arrMensajes.push(data);
        const productPerson = await objMensajes.save(data);
        const mensajes = await objMensajes.getAll();
        io.sockets.emit('listarMensajes', mensajes);
    })
});

// Routes
// app.use('/api/products', routerProducts);

app.get('/productos', async (req, res) => {
    let products = await objProducts.getAll();
    let listExists = false;

    if (products.length !== 0) {
        listExists = true;
    }
    res.render('main', { layout: 'index', data: products, listExists: listExists });
});

// listen
httpServer.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}/productos`);
});