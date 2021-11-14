// const fs = require('fs');
import fs from 'fs';
interface Product {
  id: number,
  timestamp: string,
  nombre: string,
  descripcion: string,
  codigo: string,
  url: string,
  precio: number,
  stock: number
}

class ContenedorProducto {
  private nombreArchivo: string;

  private listProducts: Product[];

  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
    this.listProducts = [];
  }

  getProductos(): string {
    return this.nombreArchivo;
  }

  async getAll(): Promise<Product[]> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        console.log('El archivo no existe');
        return new Promise((resolve) => {
          resolve([]);
        });
      }

      const contentFile = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
      let products = [];
      // console.log('contentFile', contentFile);
      if (contentFile === '') {
        console.log('getAll() => No hay datos para mostrar');
      } else {
        products = JSON.parse(contentFile);
        // console.log("getAll() => Mostrar todos los productos :\n" ,products);
      }
      // console.log('products', products);
      console.log('products[1]', products[1]);
      return products[1];
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve([]);
      });
    }
  }

  async getById(productId: number): Promise<Product | undefined> {
    const filePath = `./${this.nombreArchivo}.json`;
    const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
    const products = JSON.parse(contentFile);
    // console.log('products', products);
    // console.log('products[1]', products[1]);
    // console.log('products[1].productos', products[1].productos);
    this.listProducts = products[1].productos;

    const product = this.listProducts.find(product => product.id === productId);
    // console.log(`product`, product)
    return product;
  }

  async save(paramProducto: Product): Promise<Product | null> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);

      let productos: Product[] = [];
      const producto: Product = {...paramProducto}
      
      producto.timestamp = hoy.toLocaleString();

      if (fileExists) {
        const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
        let productosCarritos = [];

        if (contentFile === "") {
          console.log("contentFile", contentFile);
          producto.id = 1;
        } else {
          productosCarritos = JSON.parse(contentFile);
          productos = productosCarritos[1].productos;
          producto.id = productos.length + 1;
        }

        this.listProducts = productos;
        this.listProducts.push(producto);
        productosCarritos[1].productos = this.listProducts;

        const data = JSON.stringify(productosCarritos, null, 2);
        await fs.promises.writeFile(filePath, data, {encoding: "utf-8"});
        console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);
      } else {
        producto.id = 1;
        const arrayProductos = [
          {
            carritos: [],
            productos: [
              producto
            ]
          }
        ];
        this.listProducts.push(producto);
        const data = JSON.stringify(arrayProductos, null, 2);

        await fs.promises.writeFile(filePath, data, {encoding: "utf-8"});
        console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);
      }
      return producto;

    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve(null);
      });
    }
  }

  async updateById(productParam: Product, productParamId: number): Promise<Product | null> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        console.log("El archivo no existe");
        return new Promise((resolve) => {
          resolve(null);
        });
      }

      const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
      const productosCarritos = JSON.parse(contentFile);
      const productos: Product[] = productosCarritos[1].productos;

      console.log("productos", productos);
      // console.log("productParam", productParam);
      const newProducts = productos.map((product: Product) => {
        return product.id === productParamId 
          ? {
            id: productParamId === undefined ? product.id : productParamId,
            timestamp: productParam.timestamp === undefined ? product.timestamp : productParam.timestamp,
            nombre: productParam.nombre === undefined ? product.nombre : productParam.nombre,
            descripcion: productParam.descripcion === undefined ? product.descripcion : productParam.descripcion,
            codigo: productParam.codigo === undefined ? product.codigo : productParam.codigo,
            url: productParam.url === undefined ? product.url : productParam.url,
            precio: productParam.precio === undefined ? product.precio : productParam.precio,
            stock: productParam.stock === undefined ? product.stock : productParam.stock,
          } 
          : product;
      });
      // console.log("newProducts", newProducts);
      productosCarritos[1].productos = newProducts;
      fs.promises.writeFile(filePath, JSON.stringify(productosCarritos, null, 2), {encoding: "utf-8"});
      return productParam;
      
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve(null);
      });
    }
  }

  async deleteById(productId: number): Promise<Boolean> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log("El archivo no existe");
        return false;
      }

      const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
      const productosCarritos = JSON.parse(contentFile);
      const productos = productosCarritos[1].productos;
      const newProducts = productos.filter((product: Product) => product.id !== productId);

      productosCarritos[1].productos = newProducts;
      fs.promises.writeFile(filePath, JSON.stringify(productosCarritos, null, 2), {encoding: "utf-8"});
      console.log(`deleteById() => se elimino el producto con el  ID ${productId} correctamente`);
      return true;

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}

export default ContenedorProducto;
