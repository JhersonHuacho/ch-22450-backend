import ContenedorArchivo from '../../contenedores/ContenedorArchivo';

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor(){
    super('carritos.json');
  }
}

export default CarritosDaoArchivo;