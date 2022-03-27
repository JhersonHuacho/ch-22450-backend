
exports.up = function (knex) {
    knex.schema.createTable('chat', (table) => {
        table.increments('id').primary();
        table.string('email');
        table.datetime('fecha', new Date().toLocaleString());
        table.string('mensaje');
    }).then((response) => {
        console.log('tabla creada');
    }).catch((error) => {
        console.log(error)
    })
};

exports.down = function (knex) {

};
