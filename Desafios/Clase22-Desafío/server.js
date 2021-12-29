const express = require("express");
const exphbs = require("express-handlebars");
const faker = require('faker');
const { normalize, denormalize, schema } = require('normalizr');
const knex = require('./db');
const knexSqlite = require('./knexfile');
const { db } = require('./contenedores/ContenedorFirebase');
const util = require('util');
// const Contenedor = require("./contenedor");
const app = express();
// const routerProducts = require('./routers/productos');
// Server
const http = require('http');
const httpServer = http.createServer(app);
const port = process.env.PORT || 8080;
// Socket
const { Server } = require('socket.io');
const { type } = require("os");
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

// Normalización
const authorSchema = new schema.Entity('author', {}, { idAttribute: "id" });
// const textSchema = new schema.Entity('text');
const postSchema = new schema.Entity('post',
    { author: authorSchema },
    { idAttribute: "id" }
);
const postsSchema = new schema.Entity('posts',
    { posts: [postSchema] },
    { idAttribute: "id" }
);
// Fin Normalización

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

// Configurar Websockets -Conexión Socket
io.on('connection', async (socket) => {
    console.log('usuario conectado');

    // knexSqlite
    //     .from('chat')
    //     .select('id', 'email', 'fecha', 'mensaje')
    //     .then(response => {
    //         // console.log('response =>', response);
    //         io.sockets.emit('listarMensajes', response);
    //     })

    const result = [];
    const mensajesRef = db.collection('mensajes');
    const snapshot = await mensajesRef.get();
    snapshot.forEach(doc => {
        const object = doc.data();
        object.id = doc.id;
        result.push(object)
    })
    const originalData = {
        id: "mensajes",
        posts: result
    };
    console.log('result', result)
    console.log('===============s')
    const normalizedData = normalize(originalData, postsSchema);
    print(normalizedData);
    console.log('peso normalizedData', JSON.stringify(normalizedData).length)
    console.log('===============s')
    print(originalData)
    console.log('peso originalData', JSON.stringify(originalData).length)


    io.sockets.emit('listarMensajes', normalizedData);

    socket.on('sendMensaje', async (data) => {
        print(data)
        let newData = denormalize(data.result, postsSchema, data.entities);
        // knexSqlite('chat')
        //     .insert(data)
        //     .then(() => {
        //         // console.log("Se registro correctamente el chat");
        //         knexSqlite
        //             .from('chat')
        //             .select('id', 'email', 'fecha', 'mensaje')
        //             .then(reponse => {
        //                 // console.log('sendMensaje  reponse', reponse);
        //                 io.sockets.emit('listarMensajes', reponse);
        //             })
        //     })
        //     .catch((error) => {
        //         console.log('Error al guardar => ', error);
        //     });

        // const data = {
        //     author: {
        //         id: 'mail del usuario', 
        //         nombre: 'nombre del usuario', 
        //         apellido: 'apellido del usuario', 
        //         edad: 'edad del usuario', 
        //         alias: 'alias del usuario',
        //         avatar: 'url avatar (foto, logo) del usuario'
        //     },
        //     text: 'mensaje del usuario'            
        // }
        console.log("newData")
        print(newData)
        const newObject = newData.posts[0];
        const { author, fecha, text } = newObject;
        const otherObject = {
            author,
            fecha,
            text
        }
        console.log('otherObject', otherObject)
        const res = await db.collection('mensajes').add(otherObject);
        console.log('Added document with ID', res.id);

        let result = [];
        const mensajesRef = db.collection('mensajes');
        const snapshot = await mensajesRef.get();
        snapshot.forEach(doc => {
            const object = doc.data();
            object.id = doc.id;
            result.push(object)
        })
        const originalData = {
            id: "mensajes",
            posts: result
        };
        console.log('result', result)
        console.log('===============s')
        const normalizedData = normalize(originalData, postsSchema);
        print(normalizedData);
        console.log('peso normalizedData', JSON.stringify(normalizedData).length)
        console.log('===============s')
        print(originalData)
        console.log('peso originalData', JSON.stringify(originalData).length)


        io.sockets.emit('listarMensajes', normalizedData);
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