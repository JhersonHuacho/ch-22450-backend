const express = require('express');
const routerProduct = require('./src/routes/productsRoute');
const app = express();

app.use(express.json());
app.use('/api', routerProduct);

app.listen(3001, () => {
  console.log(`Server run on ${3001}`)
});