const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // Conectarse a una BD
    // Traemos usuarios
    // Filtrar los Nombres
    // Enviar data al cliente
});

app.get('/test', (req, res) => {
    let arr = [
        { name: 'Francisco' },
        { name: 'Jherson' }
    ]

    res.send({ data: arr });
});

app.listen(3002, () => {
    console.log('Server OK!')
});