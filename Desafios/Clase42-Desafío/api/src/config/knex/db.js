const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'ecommerce'
  },
  pool: {
    min: 2,
    max: 8
  }
});

knex.schema.createTableIfNotExists('product', (table) => {
  table.increments('id').primary();
  table.string('title');
  table.string('price');
  table.string('thumbnail')
}).then((response) => {
  console.log('tabla creada correctamente => ', response)
}).catch((error) => {
  console.log('Error al crear la tabla => ', error)
})

module.exports = knex;