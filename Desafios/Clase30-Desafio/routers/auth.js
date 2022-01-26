const express = require('express');
const { Router } = express;
const routerAuth = new Router();
const { cpus } = require('os');

routerAuth.get('/logout', (req, res) => {
  console.log('logout')
  // const name = req.session.name.user;
  const name = req.user.usuario;
  console.log("MongoStore");
  console.log(req.sessionID);

  req.session.destroy((err) => {
    if (err) {
      console.log('Error en Logout');
    }
    res.render('logout', {
      layout: 'index',
      user: name
    })
  });
})

routerAuth.get('/login', (req, res) => {
  res.render('login', {
    layout: 'index'
  })
})

routerAuth.get('/register', (req, res) => {
  res.render('register', {
    layout: 'index'
  })
});

routerAuth.get('/faillogin', (req, res) => {
  res.render('faillogin', {
    layout: 'index'
  })
})

routerAuth.get('/failregister', (req, res) => {
  res.render('failregister', {
    layout: 'index'
  })
})

routerAuth.get('/info', (req, res) => {
  console.log('/api/info');
  const data = {
    argumentosDeEntrada: process.argv,
    sistemaOperativo: process.platform,
    versionNode: process.version,
    rss: process.memoryUsage(),
    pathDeEjecucion: process.execPath,
    processId: process.pid,
    carpetaDelProyecto: process.cwd(),
    numeroProcesadores: cpus().length
  }

  console.log('process.memoryUsage()', process.memoryUsage())

  // res.json(data);
  res.render('info', {
    layout: 'index',
    data: data
  })
})

module.exports = routerAuth;