const express = require('express');
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'misecreto';

const app = express();
let arr = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '24h' });
  return token;
}

let user = {
  id: Math.random(),
  name: 'Francisco',
  password: '123456'
}

// console.log(generateToken(user))

const validateTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({
      error: 'no estas autenticado'
    })
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: 'no estas autorizado'
      })
    }
    req.user = decoded.data;
    next();
  });
}

/****************************************/
/*********** ROUTES *********************/
app.get('/all', (req, res) => {
  res.json({ data: arr });
});

app.get('/profile', validateTokenMiddleware, (req, res) => {
  res.send('INGRESASTE, Ruta privada o protegida');
});


app.get('/login', (req, res) => {

});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let user = arr.find(x => {
    return x.username === username
  })

  if (user) {
    const access_token = generateToken(user);
    return res.json({ message: 'User logged', token: access_token });
  }

  return res.send({ message: 'Usuario y contraseña incorrecto' });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  let user = arr.find(x => {
    return x.username === username
  })

  if (user) {
    return res.send({ message: 'El usuario ya existe!!' });
  }

  let userNew = {
    id: Math.random(),
    username,
    password
  }

  arr.push(userNew);
  return res.send({ message: 'El usuario fue registrado!!' });
});

app.listen(3002, () => {
  console.log('Server ok!')
});