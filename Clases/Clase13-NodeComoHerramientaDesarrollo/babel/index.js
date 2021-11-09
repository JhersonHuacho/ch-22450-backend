// const express = require('express');
import express from 'express';
import { getColor } from './colorServices';
const app = express();

const suma = (a, b) => {
    return a + b;
}

console.log(getColor());

app.get('/', (req, res) => {
    console.log('Hello world Dos');
});

console.log(suma(2,6));

app.listen(8080, () => {
    console.log('Server OK');
});