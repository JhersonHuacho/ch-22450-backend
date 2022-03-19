/*------------------------- */
/* Conexión a MongoDB */
/*------------------------- */
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_MONGO_URL);

mongoose.connection.on('open', () => {
  console.log('Base de datos conectada con exito');
});

mongoose.connection.on('error', () => {
  console.log('Error al conectarse!');
})
