
const knex = require("knex");

// Update with your config settings.

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      // filename: './dev.sqlite3'
      filename: './DB/ecommerce.db3'
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 8
    }
  }
}

const db = knex(config.development)

module.exports = db;

// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       // filename: './dev.sqlite3'
//       filename: './DB/ecommerce.db3'
//     }
//   },
//   useNullAsDefault: true,
//   pool: {
//     min: 2,
//     max: 8
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user: 'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user: 'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };
