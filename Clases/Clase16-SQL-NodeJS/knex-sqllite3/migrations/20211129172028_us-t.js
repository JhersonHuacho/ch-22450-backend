
exports.up = function (knex) {
    knex.schema.createTable('users', (table) => {
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
};

exports.down = function (knex) {

};
