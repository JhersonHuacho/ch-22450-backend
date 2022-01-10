const express = require("express");
const exphbs = require("express-handlebars");
const faker = require('faker');
const { normalize, denormalize, schema } = require('normalizr');
// => passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// => passport
const session = require('express-session');
// => bcrypt
const bcrypt = require('bcrypt');
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
/* Conexión a MongoDB */
/*------------------------- */
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fhuacho:fhuacho123@cluster0.n8bnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connection.on('open', () => {
  console.log('Base de datos conectada con exito');
});

mongoose.connection.on('error', () => {
  console.log('Error al conectarse!');
})
/*------------------------- */

const Usuario = require('./models/Usuarios');

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

/*********************************/
/****** PASSPORT *****************/
app.use(passport.initialize());
app.use(passport.session());

// passport.use(
//   'local-login',
//   new localStrategy((usuario, password, done) => {
//     console.log('local-login');
//     // let users = await Usuario.find();
//     // const user = users.find(objUser => {
//     //   return objUser.usuario === usuario && objUser.password === password
//     // })
//     // console.log('user')
//     // console.log(user)
//     // if (user) {
//     //   done(null, user);
//     //   return;
//     // }
//     // done(null, false);
//   })
// )

// => bcrypt
const saltRounds = 10;

function createHash(password) {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt, null);
  return hash;
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
// => fin bcrypt

passport.use(
  'local-login',
  new localStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, usuario, password, done) => {
    console.log('local-login');
    let users = await Usuario.find();
    const user = users.find(objUser => {
      // return objUser.usuario === usuario && objUser.password === password
      return objUser.usuario === usuario && isValidPassword(objUser, password)
    })

    if (user) {
      done(null, user);
      return;
    }
    done(null, false);
  })
)


passport.use(
  'local-signup',
  new localStrategy({
    usernameField: 'usuario',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, usuario, password, done) => {
    let users = await Usuario.find();
    const user = users.find(objUser => {
      return objUser.usuario === usuario && objUser.password === password
    })

    if (user) {
      console.log('El usuario ya existe!!');
      return done(null, false);
    }

    let newUsuario = new Usuario({
      usuario: usuario,
      password: createHash(password)
    })
    const usuarioSave = await newUsuario.save();
    console.log('usuario guardado correctamente!!')
    done(null, usuarioSave);
  })
)

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser');
  let user = await Usuario.findOne({ _id: id });
  done(null, user);
})

/*********************************/
/****** FIN PASSPORT *************/

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

/*****************************/
// Routes Views
app.get('/productos', (req, res) => {
  console.log('/productos');
  // if (!req.session.name) {
  if (!req.isAuthenticated()) {
    console.log('Usuario no esta autenticado')
    res.redirect('/login')
    return;
  }
  // console.log('req.user')
  // console.log(req.user)
  const name = req.user.usuario;
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
  // const name = req.session.name.user;
  const name = req.user.usuario;
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

app.get('/register', (req, res) => {
  res.render('register', {
    layout: 'index'
  })
});

app.get('/faillogin', (req, res) => {
  res.render('faillogin', {
    layout: 'index'
  })
})

app.get('/failregister', (req, res) => {
  res.render('failregister', {
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
app.post('/api/login', passport.authenticate('local-login', {
  successRedirect: '/productos',
  failureRedirect: '/faillogin'
}))

app.post('/api/register', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/failregister'
}))

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