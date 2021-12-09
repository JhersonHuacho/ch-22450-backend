const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  price: {
    type: Number,
    default: 0
  }
});

module.exports = model('product', productSchema);
