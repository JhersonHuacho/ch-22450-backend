import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB';
import { productSchema } from '../../models/Productos';

class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor(){
    super('productos', productSchema);
  }
}

export default ProductosDaoMongoDB;