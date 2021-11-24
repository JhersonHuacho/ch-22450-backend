const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
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

knex.schema.createTableIfNotExists('users', (table) => {
  table.increments('id').primary();
  table.string('name');
  table.string('email', 128);
  table.string('role').defaultTo('admin');
  table.string('password');
}).then((response) => {
  console.log('tabla creada');
}).catch((error) => {
  console.log(error)
})

// FIFO

module.exports = knex;