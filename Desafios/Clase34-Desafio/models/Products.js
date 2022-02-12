const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {
    type: String
  },
  price: {
    type: String
  },
  thumbnail: {
    type: String
  }
});

module.exports = model('product', productSchema);