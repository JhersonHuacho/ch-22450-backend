import ContenedorFirebase from '../../contenedores/ContenedorFirebase';
import { carritoSchema } from '../../models/Carritos';

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor(){
    super('carritos');
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito)
}
}

export default CarritosDaoFirebase;