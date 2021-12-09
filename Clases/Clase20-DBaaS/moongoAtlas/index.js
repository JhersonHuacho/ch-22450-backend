const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// => Conexión
mongoose.connect('');

mongoose.connection.on('open', () => {
    console.log('Base de datos en monogo Atlas, conectado')
});

mongoose.connection.on('error', (err) => {
    console.log('Error en la conexión', err);
});

// => Schema y Model (Creamos nuestra collections)

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: Number
});

model('product', productSchema);
