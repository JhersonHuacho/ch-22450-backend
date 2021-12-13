import { Schema } from 'mongoose';

export const carritoSchema = new Schema({
  productos: { 
    type: [], 
    required: true 
  }
});
