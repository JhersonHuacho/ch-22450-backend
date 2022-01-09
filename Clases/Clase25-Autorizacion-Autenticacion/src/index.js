const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');
const data = require('./data/index');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'misecreto',
  resave: true,
  saveUninitialized: true
}));

const autorizadorMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

/*****************************/
/****** PASSPORT *************/
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  'local-login',
  new localStrategy((username, password, done) => {
    let user = data.find((x) => {
      return x.username === username && x.password === password
    });

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
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, username, password, done) => {
    let user = data.find((x) => {
      return x.username === username && x.password === password
    });

    if (user) {
      console.log('El usuario ya existe!!');
      return done(null, false);
    }

    let userNew = {
      id: Math.random(),
      username,
      password
    }

    data.push(userNew);
    done(null, userNew);
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  let user = data.find((x) => {
    return x.id === id
  });

  done(null, user);
})
/*************************************/
/****** ROUTES ***********************/
app.get('/all', (req, res) => {
  res.json({ users: data });
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/home', autorizadorMiddleware, (req, res) => {
  res.send('Bienvenido!!');
})

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/signup'
}))

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
})

/*************************************/
/****** INICIAR SERVIDOR *************/
app.listen(3002, () => {
  console.log('Server Ok!')
})