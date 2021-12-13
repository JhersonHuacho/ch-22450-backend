import { Schema } from 'mongoose';

export const productSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    unique: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  thumbnail: { 
    type: String
  },
});
