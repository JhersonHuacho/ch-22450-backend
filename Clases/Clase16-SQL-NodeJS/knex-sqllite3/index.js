const express = require('express');
const knex = require('./knexfile');
const app = express();

app.use(express.json());

app.get('/all', (req, res) => {
    knex
        .from('users')
        .select('id', 'name', 'email')
        .then(response => {
            res.send({ data: response });
        });
});

app.post('/', (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    knex('users')
        .insert(data)
        .then(() => {
            console.log('Registro OK');
            res.send('Registro OK');
        })
        .catch((error) => {
            console.log('Error al guardar => ', error);
        });
});

app.listen(3001, () => {
    console.log("Server run of porst 3001s");
})