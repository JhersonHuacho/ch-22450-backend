const http = require('http');
const { Server } = require('socket.io');
const { db } = require('../contenedores/ContenedorFirebase');
const { normalize, denormalize, schema } = require('normalizr');
const util = require('util');
const argv = require('minimist')(process.argv.slice(2));
class Websocket {
  constructor(app) {
    this.httpServer = http.createServer(app);
    this.io = new Server(this.httpServer);
    this.port = process.env.PORT || argv.port || 3001;
    // => Normalización
    this.authorSchema = new schema.Entity('author', {}, { idAttribute: "id" });
    // const textSchema = new schema.Entity('text');
    this.postSchema = new schema.Entity('post',
      { author: this.authorSchema },
      { idAttribute: "id" }
    );
    this.postsSchema = new schema.Entity('posts',
      { posts: [this.postSchema] },
      { idAttribute: "id" }
    );
    // => Config Websocket
    this.config();
  }
  print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
  }
  config() {
    this.io.on('connection', async (socket) => {
      console.log('usuario conectado');

      const result = [];
      const mensajesRef = db.collection('mensajes');
      const snapshot = await mensajesRef.get();
      snapshot.forEach(doc => {
        const object = doc.data();
        object.id = doc.id;
        result.push(object)
      })
      const originalData = {
        id: "mensajes",
        posts: result
      };
      const normalizedData = normalize(originalData, this.postsSchema);
      // this.print(normalizedData);

      this.io.sockets.emit('listarMensajes', normalizedData);

      socket.on('sendMensaje', async (data) => {
        // print(data)
        let newData = denormalize(data.result, this.postsSchema, data.entities);
        const newObject = newData.posts[0];
        const { author, fecha, text } = newObject;
        const otherObject = {
          author,
          fecha,
          text
        }
        // console.log('otherObject', otherObject)
        const res = await db.collection('mensajes').add(otherObject);
        // console.log('Added document with ID', res.id);

        let result = [];
        const mensajesRef = db.collection('mensajes');
        const snapshot = await mensajesRef.get();
        snapshot.forEach(doc => {
          const object = doc.data();
          object.id = doc.id;
          result.push(object)
        })
        const originalData = {
          id: "mensajes",
          posts: result
        };
        const normalizedData = normalize(originalData, this.postsSchema);
        this.io.sockets.emit('listarMensajes', normalizedData);
      })
    });
  }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
      console.log(`PID WORKER ${process.pid}`);
    });
  }
}

module.exports = Websocket;