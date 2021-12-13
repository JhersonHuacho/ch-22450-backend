import ContenedorArchivo from '../../contenedores/ContenedorArchivo';

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor(){
    super('productos.json');
  }
}

export default ProductosDaoArchivo;