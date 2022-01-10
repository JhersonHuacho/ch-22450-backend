const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('usuario', usuarioSchema);