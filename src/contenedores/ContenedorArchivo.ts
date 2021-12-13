import fs from 'fs';
import { config } from '../config';

class ContenedorArchivo {
  private _nombreArchivo: string;
  private _filePath: string;

  constructor(nombreArchivo: string) {
    this._nombreArchivo = `${nombreArchivo}`;
    this._filePath = `${config.fileSystem.path}/${this._nombreArchivo}`;
    console.log('this._filePath', this._filePath);
    console.log('config.fileSystem', config.fileSystem);
  }

  async getById(id: number) {
    try {
      const objs = await this.getAll();
      const result = objs.find((obj: { id: number; }) => obj.id === id);
      return result;
    } catch (error) {
      console.log('error', error)
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async getAll() {
    try {
      const contentFile = await fs.promises.readFile(this._filePath, { encoding: 'utf-8' });
      return JSON.parse(contentFile);

    } catch (error) {
      console.log('error', error);
    }
  }

  async save(obj: any) {
    try {
      const objs = await this.getAll();
      let newId: number;

      if (objs.length === 0) {
        newId = 0;
      } else {
        newId = objs[objs.length - 1].id + 1; 
      }

      const newObj = {...obj, id: newId}
      objs.push(newObj);

      await fs.promises.writeFile(this._filePath, JSON.stringify(objs), {encoding: "utf-8"});
      return newObj;

    } catch (error) {
      console.log('save => error', error)
      throw new Error(`Error al guardar: ${error}`)      
    }
  }

  async update(objUpdate: any) {
    try {
      const objs = await this.getAll();
      const index = objs.findIndex((obj: any) => obj.id === objUpdate.id);

      if (index === -1) {
        throw new Error(`Error al actualizar: no se encontró el id ${objUpdate.id}`);
      } else {
        objs[index] = objUpdate;
        await fs.promises.writeFile(this._filePath, JSON.stringify(objs, null, 2), {encoding: "utf-8"});
      }
    } catch (error) {
      console.log('')
      throw new Error(`Error al borrar: ${error}`)
    }
  }

  async deleteById(id: number) {
    try {
      const objs = await this.getAll();
      const index = objs.findIndex((obj: any) => obj.id === id);

      if (index === -1) {
        throw new Error(`Error al actualizar: no se encontró el id ${id}`);
      }

      objs.splice(index, 1);
      await fs.promises.writeFile(this._filePath, JSON.stringify(objs, null, 2), {encoding: "utf-8"});
      
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this._filePath, JSON.stringify([], null, 2), {encoding: "utf-8"});
      
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }

}

export default ContenedorArchivo;