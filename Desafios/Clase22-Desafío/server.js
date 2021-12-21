const express = require("express");
const exphbs = require("express-handlebars");
const faker = require('faker');
const knex = require('./db');
const knexSqlite = require('./knexfile');
// const Contenedor = require("./contenedor");
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
// const objProducts = new Contenedor("db");
// const objMensajes = new Contenedor("db-mensajes");
// const arrMensajes = [];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.log('process.cwd()', process.cwd() + "/public");
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
io.on('connection', (socket) => {
    console.log('usuario conectado');

    knexSqlite
        .from('chat')
        .select('id', 'email', 'fecha', 'mensaje')
        .then(response => {
            // console.log('response =>', response);
            io.sockets.emit('listarMensajes', response);
        })

    socket.on('sendMensaje', (data) => {
        console.log('sendMensaje - data  => ', data)
        knexSqlite('chat')
            .insert(data)
            .then(() => {
                // console.log("Se registro correctamente el chat");
                knexSqlite
                    .from('chat')
                    .select('id', 'email', 'fecha', 'mensaje')
                    .then(reponse => {
                        // console.log('sendMensaje  reponse', reponse);
                        io.sockets.emit('listarMensajes', reponse);
                    })
            })
            .catch((error) => {
                console.log('Error al guardar => ', error);
            });
    })
});

app.get('/productos', (req, res) => {
    knex
        .from('product')
        .select('id', 'title', 'price', 'thumbnail')
        .then(products => {
            // console.log('products', products);
            let listExists = false;
            if (products.length !== 0) {
                listExists = true;
            }
            res.render('main', {
                layout: 'index',
                data: products,
                listExists: listExists
            });
        })
});

// Routes API TEST
app.get('/api/productos-test', (req, res) => {
    let arrProducts = [];

    for (i = 1; i <= 5; i++) {
        arrProducts.push({
            id: faker.datatype.number(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        });
    }

    console.log();

    res.json(arrProducts);
})

// Routes API
app.get('/api/productos', (req, res) => {
    knex
        .from('product')
        .select('id', 'title', 'price', 'thumbnail')
        .then(respone => {
            // console.log('respone', respone);
            res.json(respone)
        })
});

app.post('/api/productos', (req, res) => {
    console.log('req => ', req);
    const data = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    knex('product')
        .insert(data)
        .then(() => {
            console.log("Se registro correctamente el producto");
            res.json(data)
        })
        .catch((error) => {
            console.log('Error al guardar => ', error);
        });
});

// listen
httpServer.listen(port, () => {
    console.log(`Example app listening at http//localhost:${port}/productos`);
});