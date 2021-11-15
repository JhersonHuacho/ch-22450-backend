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

interface ResponseProducto {
  status: number,
  message: string,
  dataProduct?: Product,
  dataProducts?: Product[]
}

class ContenedorProducto {
  private nombreArchivo: string;

  private listProducts: Product[];

  constructor(nombreArchivo: string) {
    this.nombreArchivo = nombreArchivo;
    this.listProducts = [];
  }

  async getAll(): Promise<ResponseProducto> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: 'El arcchivo json no existes'
          });
        });
      }

      const contentFile = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
      let products = [];
      console.log('contentFile', contentFile);
      if (contentFile === '') {
        console.log('getAll() => No hay datos para mostrar');
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: 'El archivo json existe, pero no tiene ningun registro.'
          });
        });
      } else {
        products = JSON.parse(contentFile);
        // console.log("getAll() => Mostrar todos los productos :\n" ,products);
      }
      // console.log('products', products);
      // console.log('products[1]', products[1]);
      if (products[1].productos.length === 0) {
        return {
          status: -1,
          message: 'No existen productos en el archivo JSON.',
          dataProducts: []
        }
      } else {
        return {
          status: 1,
          message: 'Se obtuvo los productos correctamente.',
          dataProducts: products[1]
        }
      }
      
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          status: -2,
          message: 'Hubo un error al obtener los productos.'
        });
      });
    }
  }

  async getById(productId: number): Promise<ResponseProducto> {
    const filePath = `./${this.nombreArchivo}.json`;
    const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
    const products = JSON.parse(contentFile);
    // console.log('products', products);
    // console.log('products[1]', products[1]);
    // console.log('products[1].productos', products[1].productos);
    this.listProducts = products[1].productos;

    const product = this.listProducts.find(product => product.id === productId);
    // console.log(`product`, product)
    return {
      status: 1,
      message: 'Se obtuvo el producto correctamente.',
      dataProduct: product
    };
  }

  async save(paramProducto: Product): Promise<ResponseProducto> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);

      let productos: Product[] = [];
      const producto: Product = {...paramProducto};
      
      producto.timestamp = hoy.toLocaleString();

      if (fileExists) {
        const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
        let productosCarritos = [];

        if (contentFile === "") {
          producto.id = 1;
          const arrayProductos = [
            {
              carritos: []
            },
            {
              productos: [
                producto
              ]
            }
          ];
          const data = JSON.stringify(arrayProductos, null, 2);
          await fs.promises.writeFile(filePath, data, {encoding: "utf-8"});
          console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);

        } else {
          productosCarritos = JSON.parse(contentFile);
          productos = productosCarritos[1].productos;
          producto.id = productos.length + 1;

          productos.push(producto);
          productosCarritos[1].productos = productos;

          const data = JSON.stringify(productosCarritos, null, 2);
          await fs.promises.writeFile(filePath, data, {encoding: "utf-8"});
          console.log("save() => El producto se guardo correctamente. Id ==> " + producto.id);
        }
      } else {
        producto.id = 1;
        const arrayProductos = [
          {
            carritos: []
          },
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

      return {
        status: 1,
        message: 'Se guardo el producto correctamente.',
        dataProduct: producto
      }

    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          status: -2,
          message: 'Hubo un error al guardar el producto.'
        });
      });
    }
  }

  async updateById(productParam: Product, productParamId: number): Promise<ResponseProducto> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);

      if (!fileExists) {
        console.log("El archivo no existe");
        return new Promise((resolve) => {
          resolve({
            status: -1,
            message: 'El archivo JSON no existe'
          });
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
      
      return {
        status: 1,
        message: 'El producto se actualizó correctamente.',
        dataProduct: productParam
      }
      
    } catch (error) {
      console.log(error);
      return new Promise((resolve) => {
        resolve({
          status: -2,
          message: 'Hubo un error al actualizar el producto.'
        });
      });
    }
  }

  async deleteById(productId: number): Promise<ResponseProducto> {
    try {
      const filePath = `./${this.nombreArchivo}.json`;  
      const fileExists = await fs.promises.stat(filePath).then(() => true).catch(() => false);
      
      if (!fileExists) {
        console.log("El archivo no existe");
        return {
          status: -1,
          message: 'El archivo JSON no existe.'
        };
      }

      const contentFile = await fs.promises.readFile(filePath, {encoding: "utf-8"});
      const productosCarritos = JSON.parse(contentFile);
      const productos = productosCarritos[1].productos;
      const newProducts = productos.filter((product: Product) => product.id !== productId);

      productosCarritos[1].productos = newProducts;
      fs.promises.writeFile(filePath, JSON.stringify(productosCarritos, null, 2), {encoding: "utf-8"});
      console.log(`deleteById() => se elimino el producto con el  ID ${productId} correctamente`);
      
      return {
        status: -1,
        message: 'El producto se elimino correctamente.'
      }

    } catch (error) {
      console.log(error);
      return {
        status: -2,
        message: 'Hubo un error al eliminar el producto.'
      };
    }
  }

}

export default ContenedorProducto;
