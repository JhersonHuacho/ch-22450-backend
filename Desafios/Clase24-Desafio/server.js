const express = require("express");
const exphbs = require("express-handlebars");
const faker = require('faker');
const { normalize, denormalize, schema } = require('normalizr');
const session = require('express-session');
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

/*------------------------- */
/* Persistencia por MongoDB */
/*------------------------- */
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://fhuacho:fhuacho123@cluster0.n8bnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            mongoOptions: advancedOptions,
            ttl: 600
        }),
        secret: 'secreto',
        resave: true,
        saveUninitialized: true
    })
)
/*------------------------- */

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
    const normalizedData = normalize(originalData, postsSchema);

    io.sockets.emit('listarMensajes', normalizedData);

    socket.on('sendMensaje', async (data) => {
        // print(data)
        let newData = denormalize(data.result, postsSchema, data.entities);
        const newObject = newData.posts[0];
        const { author, fecha, text } = newObject;
        const otherObject = {
            author,
            fecha,
            text
        }
        // console.log('otherObject', otherObject)
        const res = await db.collection('mensajes').add(otherObject);
        // console.log('Added document with ID', res.id);

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
        const normalizedData = normalize(originalData, postsSchema);
        io.sockets.emit('listarMensajes', normalizedData);
    })
});

// Routes Views
app.get('/productos', (req, res) => {
    console.log('/productos');
    if (!req.session.name) {
        res.redirect('/login')
        return;
    }
    const name = req.session.name.user;
    console.log('name ' + name);
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
                listExists: listExists,
                user: name
            });
        })
});

app.get('/logout', (req, res) => {
    console.log('logout')
    const name = req.session.name.user;
    console.log("MongoStore");
    console.log(req.sessionID);

    req.session.destroy((err) => {
        if (err) {
            console.log('Error en Logout');
        }
        res.render('logout', {
            layout: 'index',
            user: name
        })
    });
})

app.get('/login', (req, res) => {
    res.render('login', {
        layout: 'index'
    })
})

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
app.post('/api/login', (req, res) => {
    console.log('/api/login')
    console.log(req.body);
    // const data = {
    //     name: req.body.login
    // }
    req.session.name = {
        user: req.body.login
    };
    req.session.save();
    res.redirect('/productos')
})
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