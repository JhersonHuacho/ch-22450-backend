const express = require("express");
const compression = require('compression')
const exphbs = require("express-handlebars");
const argv = require('minimist')(process.argv.slice(2));
// => passport
const session = require('express-session');
// => Persistencia por MongoDB
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
// => passport
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// => Model
const Usuario = require('./src/models/Usuarios');
// =>
const { loggerMiddleware, notFoundMiddleware, handleErrorMiddleware } = require("./src/middleware");
const { createHash, isValidPassword } = require("./src/utils/encrypt");
// =>
const routerAuth = require('./src/routers/auth');
const routerApi = require("./src/routers/api");
const routerProduct = require("./src/routers/products");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || argv.port || 3001;
    this.middlewares();
    this.setServer()
    this.initPassport();
    this.routes();
  }

  getApp() {
    return this.app;
  }

  middlewares() {
    // console.log('THIS => middlewares() ' + JSON.stringify(this));
    this.app.use(loggerMiddleware)
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
    this.app.set("views", "./src/views");
    this.app.set("view engine", "hbs");
    this.app.engine(
      'hbs',
      exphbs({
        extname: 'hbs',
        layoutsDir: __dirname + '/src/views/layouts',
        defaultLayout: 'index',
        partialsDir: __dirname + '/src/views/partials'
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
        let users = await Usuario.find();
        console.log('local-login', users);
        const user = users.find(objUser => {
          return objUser.usuario === usuario && isValidPassword(objUser, password)
        })

        console.log('local-login', user);

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
          return objUser.usuario === usuario
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
    this.app.use('/api', routerApi);
    // ==> Routes Views
    this.app.use('/auth', routerAuth);
    this.app.use('/productos', routerProduct);
    // => Middlewares Routers
    this.app.use(notFoundMiddleware);
    this.app.use(handleErrorMiddleware)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
      console.log(`PID WORKER ${process.pid}`);
    })
  }
}

module.exports = Server;