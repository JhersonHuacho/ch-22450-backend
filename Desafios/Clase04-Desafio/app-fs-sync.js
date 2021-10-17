
const fs = require("fs");

class Contenedor {
  
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.arrayObjetos = [];
    this.id = 0;
  }

  save(objeto) {
    this.arrayObjetos.push(objeto);

    const filePath = `./${this.nombreArchivo}.json`;
    const data = JSON.stringify(this.arrayObjetos, null, 2);
    
    fs.writeFileSync(filePath, data, {encoding: "utf-8"});
    return objeto.id;
  }

  getById(id) {
    const contentFile = fs.readFileSync(`./${this.nombreArchivo}.json`, {encoding: "utf-8"});
    const objetos = JSON.parse(contentFile);
    const objeto = objetos.find(x => x.id === id)
    // console.log(objeto);
    return objeto;
  }

  getAll() {
    const contentFile = fs.readFileSync(`./${this.nombreArchivo}.json`, {encoding: "utf-8"});
    const objetos = JSON.parse(contentFile);
    return objetos;
  }

  deleteById(id) {
    const newObjects = this.getAll().filter(objeto => objeto.id !== id);
    this.arrayObjetos = newObjects;

    const filePath = `./${this.nombreArchivo}.json`;
    const data = JSON.stringify(this.arrayObjetos, null, 2);
    
    fs.writeFileSync(filePath, data, {encoding: "utf-8"});
  }

  deleteAll() {
    const filePath = `./${this.nombreArchivo}.json`;

    fs.writeFileSync(filePath, "", {encoding: "utf-8"});
  }
}

const archivo = new Contenedor("papi");
const producto = {
  title: "Escuadra",
  price: 123.45,
  thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}
// archivo.save(producto);
archivo.getById(1).then(product => console.log(product));
// console.log(objeto);

