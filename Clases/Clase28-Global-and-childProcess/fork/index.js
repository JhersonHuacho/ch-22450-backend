const express = require('express')
const { fork } = require('child_process');

const app = express();

let visitas = 0;

const calculo = () => {
    let suma = 0;
    for (let i = 0; i <= 5e9; i++) {
        suma += i;
    }
}

app.get('/calculo', (req, res) => {
    // let suma = calculo();
    // res.send(`La suma es : ` + suma);
    const comp = fork('./calculo.js');
    comp.send('start');

    comp.on('message', (suma) => {
        res.send(`La suma es : ` + suma);
    })
})

app.get('/', (req, res) => {
    visitas++;
    res.send(`Visitas: ${visitas}`);
});

app.listen(3002, () => {
    console.log('Server ok!')
});