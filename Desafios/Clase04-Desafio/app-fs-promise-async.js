
const fs = require("fs");

module.exports = class Contenedor {
  
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.listProducts = [];
  }

  async save(product) {
    try {
      const filePath = `./${this.nombreArchivo}.txt`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      if (fileExists) {
        const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
        let products = [];

        if (contentFile === "") {
          console.log("contentFile", contentFile);
          product.id = 1;
        } else {
          products = JSON.parse(contentFile);
          // console.log("products :\n", products);
          // const newId = await products.reduce(async (preventId, currentId) => {
          //   const acumulador = await preventId;
            // console.log("acumulador => ", acumulador);
            // console.log("currentId.id => ", currentId.id);
          //   const current = (parseInt(currentId.id) > acumulador) ? parseInt(currentId.id) : acumulador + 1;
          //   return current;
          // }, Promise.resolve(1));
          // console.log("newId : \n", newId);
          product.id = products.length + 1;
        }

        this.listProducts = products;
        this.listProducts.push(product);
        const data = JSON.stringify(this.listProducts, null, 2);
        await fs.promises.writeFile(filePath, data, {encoding: "utf-8"});
        console.log("save() => El producto se guardo correctamente. Id ==> " + product.id);
      } else {
        product.id = 1;
        this.listProducts.push(producto);
        const data = JSON.stringify(this.listProducts, null, 2);

        await fs.promises.writeFile(filePath, data, {encoding: "utf-8"});
        console.log("save() => El producto se guardo correctamente. Id ==> " + product.id);
      }

    } catch (error) {
      console.log(error); 
    }
  }

  async getById(productId) {
    const filePath = `./${this.nombreArchivo}.txt`;
    const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
    const products = JSON.parse(contentFile);
    // console.log(products);
    this.listProducts = products;

    const product = this.listProducts.find(product => product.id === productId);
    return product;
  }

  async getAll() {
    try {
      const filePath = `./${this.nombreArchivo}.txt`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log("El archivo no existe");
        return false;
      }

      const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
      let products = [];

      if (contentFile === "") {
        console.log("getAll() => No hay datos para mostrar");
      } else {
        products = JSON.parse(contentFile);
        console.log("getAll() => Mostrar todos los productos :\n" ,products);
      }


    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(productId) {
    try {
      const filePath = `./${this.nombreArchivo}.txt`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log("El archivo no existe");
        return false;
      }

      const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
      const products = JSON.parse(contentFile);
      const newProducts = products.filter(product => product.id !== productId);

      fs.promises.writeFile(filePath, JSON.stringify(newProducts, null, 2), {encoding: "utf-8"});
      console.log(`deleteById() => se elimino el producto con el  ID ${productId} correctamente`);

    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const filePath = `./${this.nombreArchivo}.txt`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log("El archivo no existe");
        return false;
      }
      fs.promises.writeFile(filePath, "", {encoding: "utf-8"});
      console.log("deleteAll() => se eliminaron todos los productos correctamente.");

    } catch (error) {
      console.log(error);
    }
  }
}

// const archivo = new Contenedor("productos");

// const productoUno = {
//   title: "Escuadra",
//   price: 123.45,
//   thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
// }

// archivo.save(productoUno);

// const productoDos = {
//   title: "Calculadora",
//   price: 234.56,
//   thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
// }

// archivo.save(productoDos);

// const productoTres = {
//   title: "'Globo Terráqueo",
//   price: 345.67,
//   thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
// }

// archivo.save(productoTres);

// archivo.getById(1).then(product => console.log("getById() => get del producto \n", product));
// archivo.getAll();
// archivo.deleteById(2);
// archivo.getAll();
// archivo.deleteAll();
// archivo.getAll();
