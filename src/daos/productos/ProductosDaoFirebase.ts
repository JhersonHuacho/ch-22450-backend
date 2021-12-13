import ContenedorFirebase from '../../contenedores/ContenedorFirebase';
import { productSchema } from '../../models/Productos';

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor(){
    super('productos');
  }
}

export default ProductosDaoFirebase;