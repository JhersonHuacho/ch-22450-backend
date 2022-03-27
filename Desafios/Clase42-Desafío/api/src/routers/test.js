const express = require('express');
const { login } = require('../controllers/test');
const { Router } = express;
const routerTest = Router();

// const login = (req, res) => {
//   console.log("getLogin", __dirname);
//   res.render('login', {
//     layout: 'index'
//   })
// }

routerTest.get('/prueba', login);


module.exports = {
  routerTest
}
