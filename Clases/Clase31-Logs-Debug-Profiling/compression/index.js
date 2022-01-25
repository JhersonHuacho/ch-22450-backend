const express = require('express');
const compression = require('compression');
require('dotenv').config();

const app = express();
app.use(compression());

app.get('/', (req, res) => {
  if (process.env.NODE_ENV == 'prod') {
    res.send('producción');
  }
  res.send('hello world'.repeat(1000));
});

app.listen(8082, () => {
  console.log('Server ok !!')
})