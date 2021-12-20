const express = require('express');
const faker = require('faker');
const fs = require('fs');

const app = express();
let arrInfo = [];

app.post('/api/usuarios/popular', (req, res) => {
    for (i = 0; i <= req.query.cant || 50; i++) {
        arrInfo.push({
            id: Math.random(),
            name: faker.name.firstName(),
            email: faker.internet.email(),
            job: faker.name.jobTitle(),
            ubication: faker.random.locale()
        })
    }
})

fs.writeFile('./dataMock.json', JSON.stringify(arrInfo, null, 2), (err) => {
    if (err) {
        console.log('Error al crear')
    }
    console.log('Archivo creado');
})


app.listen(3001, () => {
    console.log('Server OK!')
})