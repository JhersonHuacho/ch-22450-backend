const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

let msn = [];

// Configurar el cliente
app.use(express.static(__dirname + '/public'));

// Rutas
app.get('/api', (req, res) => {
  // res.send('Hello World');
  res.sendFile(__dirname + '/public/index.html');
});

// Websocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  // socket.emit("message_client", "Hola mundo desde el server");
  

  socket.on('message_backend', (data) => {
    console.log(data);
  });

  socket.on('msn_client', (data) => {
    console.log(data);
    msn.push(data);
    socket.emit('message_client', msn);
  });
});

// Escuchando el servidor
server.listen(8080, () => {
  console.log('Server ok!');
});