const express = require("express");
const compression = require('compression')
const exphbs = require("express-handlebars");
const argv = require('minimist')(process.argv.slice(2));
// =>
const knex = require('./db');
// =>
const routersAuth = require('./routers/auth');
// => passport
const session = require('express-session');
// => Persistencia por MongoDB
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// => passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Usuario = require('./models/Usuarios');
// Logger
const log4js = require('log4js');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || argv.port || 3001;
    this.saltRounds = 10;
    this.loggerServer();
    this.loggerConsole = log4js.getLogger();
    this.loggerFile = log4js.getLogger('loggerFile');
    // Middlewares
    this.middlewares();
    //
    this.setServer()
    // Conectar BD
    this.initPassport();
    // Rutas de mi aplicación
    this.routes();

  }
  getApp() {
    return this.app;
  }
  // => bcrypt
  createHash(password) {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(password, salt, null);
    return hash;
  }
  // => bcrypt
  isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  loggerServer() {
    log4js.configure({
      appenders: {
        loggerConsole: { type: 'console' },

        archivoWarn: { type: 'file', filename: 'warn.log' },
        archivoError: { type: 'file', filename: 'error.log' },
        loggerArchivoWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' },
        loggerArchivoError: { type: 'logLevelFilter', appender: 'archivoError', level: 'error' }
      },
      categories: {
        default: { appenders: ['loggerConsole'], level: 'info' },
        loggerFile: { appenders: ['loggerArchivoWarn', 'loggerArchivoError'], level: 'all' }
      }
    });
  }
  middlewares() {
    console.log('THIS => middlewares() ' + JSON.stringify(this));
    // this.app.use(function notFound(req, res, next) {
    //   console.log('THIS => this.app.use ' + this);
    //   console.log('HUACHO' + `url: ${req.url} - method: ${req.method}`);
    //   this.loggerConsole.info(`url: ${req.url} - method: ${req.method}`);
    //   next();
    // })
    this.app.use((req, res, next) => {
      console.log('THIS => this.app.use ' + this);
      console.log('HUACHO' + `url: ${req.url} - method: ${req.method}`);
      this.loggerConsole.info(`url: ${req.url} - method: ${req.method}`);
      next();
    })
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/static', express.static(__dirname + "/public"));
    this.app.use(compression());
    // Persistencia por MongoDB
    this.app.use(
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
    /****** PASSPORT *****************/
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  setServer() {
    this.app.set("views", "./views");
    this.app.set("view engine", "hbs");
    this.app.engine(
      'hbs',
      exphbs({
        extname: 'hbs',
        layoutsDir: __dirname + '/views/layouts',
        defaultLayout: 'index',
        partialsDir: __dirname + '/views/partials'
      })
    );
  }

  initPassport() {
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
  }

  routes() {
    this.app.use(routersAuth);
    console.log('ROUTES');
    // ==> Routes Views
    this.app.get('/productos', (req, res) => {
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

    // ==> Routes API TEST
    this.app.get('/api/randoms', (req, res) => {
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

    this.app.get('/productos-test', (req, res) => {
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
    this.app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/productos',
      failureRedirect: '/faillogin'
    }))

    this.app.post('/register', passport.authenticate('local-signup', {
      successRedirect: '/login',
      failureRedirect: '/failregister'
    }))

    this.app.get('/api/productos', (req, res) => {
      knex
        .from('product')
        .select('id', 'title', 'price', 'thumbnail')
        .then(respone => {
          // console.log('respone', respone);
          res.json(respone)
        })
    });

    this.app.post('/productos', (req, res) => {
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

    // => Middlewares Routers
    this.app.use((req, res) => {
      this.loggerFile.warn(`url: ${req.url} - method: ${req.method}`);
      res.status(404).send({
        error: 'unknow endpoint'
      });
    });
    // this.app.use(function handleErrors(error, req, res, next) {
    //   this.loggerFile.error(`url: ${req.url} - method: ${req.method}`);
    //   res.status(500).send();
    // })
    this.app.use((error, req, res, next) => {
      this.loggerFile.error(`url: ${req.url} - method: ${req.method}`);
      res.status(500).send();
    })
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
      console.log(`PID WORKER ${process.pid}`);
    })
  }
}

module.exports = Server;