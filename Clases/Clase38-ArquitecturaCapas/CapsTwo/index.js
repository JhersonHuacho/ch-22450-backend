const express = require('express');
const routerUser = require('./src/routes/user');
const app = express();

app.use('/api', routerUser);

app.listen(3001, () => {
  console.log(`Server run on ${3001}`)
});