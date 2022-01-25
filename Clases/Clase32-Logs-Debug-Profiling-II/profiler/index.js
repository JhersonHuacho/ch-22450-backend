const express = require('express');
const crypto = require('crypto');
const app = express();

const users = {};
const PORT = process.argv[2] || 8080;

app.get("/", (req, res) => {
  res.json({ data: '1' });
})

app.get('/newUser', (req, res) => {
  const username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 52, 'sha512');

  users[username] = { salt, hash };
  res.sendStatus(200);

});

/** LOGIN BLOQUEANTE */
app.get('/auth-bloq', (req, res) => {
  const username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    // return res.sendStatus(400);
    process.exit();
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 52, 'sha512');

  if (crypto.timingSafeEqual(hash, encry))

});

/** LOGIN NO BLOQUEANTE */
app.get('/auth-nobloq', (req, res) => {
  const username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    // return res.sendStatus(400);
    process.exit();
  }

  crypto.pbkdf2(
    password,
    users[username].salt,
    10000,
    512,
    "sha512",
    (err, hash) => {
      if (users[username].hash)
    }
  );

});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

