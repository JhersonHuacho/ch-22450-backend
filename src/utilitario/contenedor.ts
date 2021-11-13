const fs = require('fs');

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

class Contenedor {
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

  async save(producto: Product): Promise<Product | null> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      let productos: Product[] = [];

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

}

export default Contenedor;
