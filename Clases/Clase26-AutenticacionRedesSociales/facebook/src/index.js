const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

let arr = [];

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'misecreto',
  resave: true,
  saveUninitialized: true
}));

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new FacebookStrategy({
    clientID: '320890373094642',
    clientSecret: '22de62dd14074df8e1e4160785e5522b',
    callbackURL: 'https://localhost:3002/auth/facebook/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    done(null, profile);
  })
)

passport.serializeUser((user, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {
  let user = data.find(x => {
    return x.id === id
  });
  done(null, user);
})

// ROUTES

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.listen(3002, () => {
  console.log('Server OK!')
})