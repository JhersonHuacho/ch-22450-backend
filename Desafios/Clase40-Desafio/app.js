require('dotenv').config();
const cluster = require('cluster');
const { cpus } = require('os');
const Server = require('./server');
const Websocket = require('./src/utils/Websocket');
const argv = require('minimist')(process.argv.slice(2));
const modoCluster = argv.modo === 'CLUSTER';

if (modoCluster && cluster.isMaster) {
  const numCPUS = cpus().length;
  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }
} else {
  const server = new Server();
  /* => Conexión a MongoDB */
  require('./src/config/mongo/mongo');
  require('./src/config/logs/configLogs');
  // console.log(server.getApp());
  const webSocket = new Websocket(server.getApp());
  // server.listen();
  webSocket.listen();
}