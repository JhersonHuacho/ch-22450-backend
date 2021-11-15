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

interface Carrito {
  id: number,
  timestamp: string,
  productos: Product[]
}

interface ResponseCarrito {
  status: number,
  message: string,
  dataCarritoId?: number,
  dataProduct?: Product,
  dataProducts?: Product[]
}

class ContenedorCarrito {
  private nombreArchivo: string;
  private listProducts: Product[];
  private listCarritos: Carrito[];

  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
    this.listProducts = [];
    this.listCarritos = [];
  }

  async getProductosPorCarrito(paramIdCarrito: number): Promise<ResponseCarrito> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        console.log('El archivo no existe');
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: 'El archivo no existe'
          });
        });
      }

      const contentFile = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
      let listaProductosCarritos = [];
      // console.log('contentFile', contentFile);
      if (contentFile === '') {
        console.log('getAll() => No hay datos para mostrar');
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: 'El archivo existe, pero no hay registros'
          });
        });
      } else {
        listaProductosCarritos = JSON.parse(contentFile);
      }

      // console.log('products', products);
      const listaCarritos = listaProductosCarritos[0].carritos;
      const carrito: Carrito = listaCarritos.find((carrito: Carrito) => carrito.id === paramIdCarrito);

      if (carrito === undefined || carrito === null) {
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: `No hay ningun carrito con el ID ${paramIdCarrito}`
          });
        });
      }

      const productos = carrito.productos;
      if (productos.length === 0) {
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: `No existen productos del carrito con ID ${paramIdCarrito}`
          });
        });
      }
      return {
        status: 1,
        message: `Se obtuvieron los correctamente los productos del carrito con ID ${paramIdCarrito}`,
        dataProducts: productos
      };

    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          status: -2,
          message: 'ERROR: Hubo un error al obtener los datos'
        });
      });
    }
  }

  async saveCarrito(): Promise<ResponseCarrito> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      let carritos: Carrito[] = [];
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);

      const carrito: Carrito = {
        id: 0,
        timestamp: hoy.toLocaleString(),
        productos: []
      };

      if (fileExists) {
        const contentFile = await fs.promises.readFile(filePath, { encoding: "utf-8" });
        let listaProductosCarritos = [];

        if (contentFile === "") {
          console.log("contentFile", contentFile);
          carrito.id = 1;
          const arrayCarritosProductos = [
            {
              carritos: [
                carrito
              ]
            },
            {
              productos: []
            }
          ];
          const data = JSON.stringify(arrayCarritosProductos, null, 2);
          await fs.promises.writeFile(filePath, data, { encoding: "utf-8" });

        } else {

          listaProductosCarritos = JSON.parse(contentFile);
          carritos = listaProductosCarritos[0].carritos;
          carrito.id = carritos.length + 1;
          // this.listCarritos = carritos;
          // this.listCarritos.push(carrito);
          carritos.push(carrito);
          listaProductosCarritos[0].carritos = carritos;

          const data = JSON.stringify(listaProductosCarritos, null, 2);
          await fs.promises.writeFile(filePath, data, { encoding: "utf-8" });
        }
      } else {
        carrito.id = 1;
        const arrayCarritos = [
          {
            carritos: [
              carrito
            ]
          },
          {
            productos: []
          }
        ];

        const data = JSON.stringify(arrayCarritos, null, 2);

        await fs.promises.writeFile(filePath, data, { encoding: "utf-8" });
        console.log("save() => El producto se guardo correctamente. Id ==> " + carrito.id);
      }
      return {
        status: 1,
        message: 'El carrito se guardo correctamente',
        dataCarritoId: carrito.id
      };

    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          status: -2,
          message: 'Hubo un error al guardar el carrito'
        });
      });
    }
  }

  async saveProductoAlCarrito(paramIdCarrito: number, paramProducto: Product): Promise<ResponseCarrito> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      const nuevoProducto = { ...paramProducto };

      if (fileExists) {
        const contentFile = await fs.promises.readFile(filePath, { encoding: "utf-8" });
        const listaProductosCarritos = JSON.parse(contentFile);
        const carritos = listaProductosCarritos[0].carritos;
        const carrito = carritos.find((carrito: Carrito) => carrito.id === paramIdCarrito);

        if (carrito === undefined || carrito === null) {
          return new Promise((resolve) => {
            resolve({
              status: -1,
              message: `El carrito con ID ${paramIdCarrito} no existe.`
            });
          });
        }

        const productos = carrito.productos;

        nuevoProducto.id = productos.length + 1;
        productos.push(nuevoProducto);
        carrito.productos = productos;

        listaProductosCarritos[0].carritos = carritos.map((pCarrito: Carrito) => {
          return pCarrito.id === paramIdCarrito ? carrito : pCarrito;
        });

        const data = JSON.stringify(listaProductosCarritos, null, 2);
        await fs.promises.writeFile(filePath, data, { encoding: "utf-8" });
        return {
          status: 1,
          message: `El producto fue agregado correctamente al carrito con ID ${paramIdCarrito}`,
          dataProduct: nuevoProducto
        };

      } else {
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: 'El archivo no existe.'
          });
        });
      }
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          status: -2,
          message: 'Hubo un error al agregar el producto al carrito.'
        });
      });
    }
  }

  async deleteCarritoPorId(paramCarritoId: number): Promise<ResponseCarrito> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        console.log("El archivo no existe");
        return {
          status: -1,
          message: 'El archivo no existe'
        };
      }

      const contentFile = await fs.promises.readFile(filePath, { encoding: "utf-8" });
      const listaCarritosProductos = JSON.parse(contentFile);
      const carritos = listaCarritosProductos[0].carritos;
      const carrito = carritos.find((carrito: Carrito) => carrito.id === paramCarritoId);

      if (carrito === undefined || carrito === null) {
        return {
          status: -1,
          message: `El carrito con ID ${paramCarritoId} no existe.`
        };
      }

      const newCarritos = carritos.filter((carrito: Carrito) => carrito.id !== paramCarritoId);

      listaCarritosProductos[0].carritos = newCarritos;
      fs.promises.writeFile(filePath, JSON.stringify(listaCarritosProductos, null, 2), { encoding: "utf-8" });
      console.log(`deleteCarritoPorId() => se elimino el carrito con el  ID ${paramCarritoId} correctamente`);
      return {
        status: 1,
        message: "Se elimino el carrito correctamente"
      };

    } catch (error) {
      console.log(error);
      return {
        status: -2,
        message: 'Hubo un error al eliminar el carrito'
      };
    }
  }

  async deleteProductoDelCarrito(paramCarritoId: number, paramProductoId: number): Promise<ResponseCarrito> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        console.log("El archivo no existe");
        return {
          status: -1,
          message: 'El archivo no existe'
        };
      }

      const contentFile = await fs.promises.readFile(filePath, { encoding: "utf-8" });
      const listaCarritosProductos = JSON.parse(contentFile);
      const carritos = listaCarritosProductos[0].carritos;
      const carrito = carritos.find((carrito: Carrito) => carrito.id === paramCarritoId);

      if (carrito === undefined || carrito === null) {
        return {
          status: -1,
          message: `El carrito con ID ${paramCarritoId} no existe.`
        };
      }

      const productos = carrito.productos;
      const newProductos = productos.filter((producto: Product) => producto.id !== paramProductoId);

      carrito.productos = newProductos;

      listaCarritosProductos[0].carritos = carritos.map((pCarrito: Carrito) => {
        return pCarrito.id === paramCarritoId ? carrito : pCarrito;
      });
      fs.promises.writeFile(filePath, JSON.stringify(listaCarritosProductos, null, 2), { encoding: "utf-8" });
      console.log(`deleteProductoDelCarrito() => se elimino el carrito con el  ID ${paramCarritoId} correctamente`);
      return {
        status: 1,
        message: `El producto se elimino correctamente del carrito con ID ${paramCarritoId}`
      };

    } catch (error) {
      console.log(error);
      return {
        status: -2,
        message: 'Hubo un error al eliminar el producto del carrito'
      };
    }
  }

}

export default ContenedorCarrito;
