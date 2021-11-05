const express = require('express');
const app = express();
const router = require('./router/index');
let msn = [];

// Archivos estáticos
app.use(express.static(__dirname + '/public'));

// Server
const http = require('http');
const httpServer = http.createServer(app);
const port = process.env.PORT || 3003; 
// Socket
const { Server } = require('socket.io');
const io = new Server(httpServer);

// Configurar Websocket - Conexión Socket
io.on('connection', (socket) => {

  console.log('Cliente conectado');
  // socket.emit('message_backend', 'Hola soy el Backend');
  socket.on('message_client', (data) => {
    console.log('data', data);
  });
  socket.on('dataWebsocket', (data) => {
    msn.push(data);
    // socket.emit('message_backend', msn);
    // console.log(msn);
    io.sockets.emit('message_backend', msn);
  })
});

// Router
app.use('/api', router);

httpServer.listen(port, () => {
  console.log('server ok');
});