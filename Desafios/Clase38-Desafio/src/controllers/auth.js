const { cpus } = require('os');

const getLogout = (req, res) => {
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
}

const getLogin = (req, res) => {
  res.render('login', {
    layout: 'index'
  })
}

const getRegister = (req, res) => {
  res.render('register', {
    layout: 'index'
  })
}

const getFaillogin = (req, res) => {
  res.render('faillogin', {
    layout: 'index'
  })
}

const getFailRegister = (req, res) => {
  res.render('failregister', {
    layout: 'index'
  })
}

const getInfo = (req, res) => {
  // console.log('/api/info');
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

  console.log(data)

  // res.json(data);
  res.render('info', {
    layout: 'index',
    data: data
  })
}

module.exports = {
  getLogout,
  getLogin,
  getRegister,
  getFaillogin,
  getFailRegister,
  getInfo
}