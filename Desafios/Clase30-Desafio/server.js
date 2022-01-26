const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const exphbs = require("express-handlebars");
const bcrypt = require('bcrypt');
// const faker = require('faker');
// const { fork } = require('child_process');
const { normalize, denormalize, schema } = require('normalizr');
const cluster = require('cluster');
const { cpus } = require('os');

// => passport
const session = require('express-session');
// => bcrypt
const knex = require('./db');
// const knexSqlite = require('./knexfile');
const { db } = require('./contenedores/ContenedorFirebase');
const util = require('util');
const routersApi = require('./routers/api');
const routersAuth = require('./routers/auth');

var argv = require('minimist')(process.argv.slice(2));

const port = process.env.PORT || argv.port || 8080;
const modoCluster = argv.modo === 'CLUSTER';
// Socket
const { Server } = require('socket.io');
const { type } = require("os");


if (modoCluster && cluster.isMaster) {
  const numCPUS = cpus().length;
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }
} else {
  // const Contenedor = require("./contenedor");
  const app = express();
  // const routerProducts = require('./routers/productos');
  // Server
  const http = require('http');
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);

  /*------------------------- */
  /* Conexión a MongoDB */
  /*------------------------- */
  require('./mongo');
  /*------------------------- */

  /*------------------------- */
  /* Persistencia por MongoDB */
  /*------------------------- */
  const MongoStore = require('connect-mongo');
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.DB_MONGO_URL,
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

  app.use(routersAuth);
  // app.use('/api', routersApi)

  // => passport
  const passport = require('passport');
  const localStrategy = require('passport-local').Strategy;

  const Usuario = require('./models/Usuarios');
  /*********************************/
  /****** PASSPORT *****************/
  app.use(passport.initialize());
  app.use(passport.session());

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

  // **************************************************
  // Routes API TEST

  app.get('/api/randoms', (req, res) => {
    console.log('req.query =>', req.query)
    const min = 1;
    const max = req.query.cant === undefined ? 100000000 : Number(req.query.cant);
    const child = fork('./calculo.js', [min, max]);
    child.send('start');

    // res.json({ data: objRandom })

    child.on('message', (objRandom) => {
      // console.log('objRandom server.js', objRandom)
      res.json({ data: objRandom });
    })
  })

  app.get('/productos-test', (req, res) => {
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
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/productos',
    failureRedirect: '/faillogin'
  }))

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/failregister'
  }))

  app.get('/productos', (req, res) => {
    knex
      .from('product')
      .select('id', 'title', 'price', 'thumbnail')
      .then(respone => {
        // console.log('respone', respone);
        res.json(respone)
      })
  });

  app.post('/productos', (req, res) => {
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
    console.log('Server express escuchando en el puerto ' + port);
    console.log(`PID WORKER ${process.pid}`);
  });
  // 425 lineas a
  // xx
}