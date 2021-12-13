import admin from 'firebase-admin';
// import { config } from '../config';
const serviceAccount = require('../firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

class ContenedorFirebase {
  private _collection;

  constructor(nameCollection: string) {
    this._collection = db.collection(nameCollection);
  }

  async getById(id: number) {
    try {
      const doc = await this._collection.doc(id.toString()).get();
      if (!doc.exists) {
        throw new Error(`Error al listar por id: no se encontró`)
      } else {
        const data = doc.data();
        return { ...data, id }
      }
    } catch (error) {
      console.log('error', error)
      throw new Error(`Error al listar por id: ${error}`)
    }
  }

  async getAll() {
    try {
      const result: any = [];
      const snapshot = await this._collection.get();
      snapshot.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() })
      })
      return result
    } catch (error) {
      console.log('error', error);
      throw new Error(`Error al listar todo: ${error}`)
    }
  }

  async save(obj: any) {
    try {
      const guardado = await this._collection.add(obj);
      return { ...obj, id: guardado.id }
    } catch (error) {
      console.log('save => error', error)
      throw new Error(`Error al guardar: ${error}`)
    }
  }

  async update(objUpdate: any) {
    try {
      const actualizado = await this._collection.doc(objUpdate.id).set(objUpdate);
      return actualizado
    } catch (error) {
      console.log('')
      throw new Error(`Error al actualizar: ${error}`)
    }
  }

  async deleteById(id: number) {
    try {
      const item = await this._collection.doc(id.toString()).delete();
      return item;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      const docs = await this.getAll();
      const ids = docs.map((d: any) => d.id);
      const promesas = ids.map((id: any) => this.deleteById(id));

      const resultados: any = await Promise.allSettled(promesas);
      const errores = resultados.filter((r: any) => r.status == 'rejected');
      if (errores.length > 0) {
          throw new Error('no se borró todo. volver a intentarlo');
      }
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }

}

export default ContenedorFirebase;