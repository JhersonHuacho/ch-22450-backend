import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB';
import { carritoSchema } from '../../models/Carritos';

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor(){
    super('carritos', carritoSchema);
  }

  async save(carrito = { productos: [] }) {
    return super.save(carrito)
}
}

export default CarritosDaoMongoDB;