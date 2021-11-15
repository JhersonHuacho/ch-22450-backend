import { Request, Response, Router } from 'express';
import ContenedorProducto from '../utilitario/Producto';
// const Contenedor = require('../utilitario/fileSystem.ts');

const router = Router();
const objProducts = new ContenedorProducto('db');
// const administrador: boolean;

router.get('/:id?', async (req: Request, res: Response) => {
  const id: number = req.params.id === undefined ? -1 : parseInt(req.params.id);
  // console.log('params', req.params);
  // console.log('params id', id);
  if (id === -1) {
    const response = await objProducts.getAll();

    if (response.status === 1) {
      res.json({
        message: response.message,
        data: response.dataProducts,
        status: 'OK'
      });
    } else {
      res.json({
        message: response.message,
        data: [],
        status: response.status === -1 ? 'Validación' : 'ERROR'
      });
    }

  } else {

    const response = await objProducts.getById(id);

    if (response.status === 1) {
      res.json({
        message: response.message,
        data: response.dataProduct,
        status: 'OK'
      });
    } else {
      res.json({
        message: response.message,
        data: [],
        status: response.status === -1 ? 'Validación' : 'ERROR'
      });
    }
  }
  
});

router.post('/', async (req:Request, res: Response) => {
  // console.log('req.body', req.body);
  console.log(`req.query`, req.query)
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;

  if (isAdmin) {
    const response = await objProducts.save(req.body);

    if (response.status === 1) {
      res.json({
        message: response.message,
        data: response.dataProduct,
        status: 'OK'
      });
    } else {
      res.json({
        message: response.message,
        data: [],
        status: response.status === -1 ? 'Validación' : 'ERROR'
      });
    }
  } else {
    res.json({
      error: -1,
      descripcion: 'ruta / método "POST" no autorizada'
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  // console.log(`req.query`, req.query)
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;

  if (isAdmin) {
    const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
    const body = req.body;
    const response = await objProducts.updateById(body, id);
  
  
    if (response.status === 1) {
      res.json({
        message: 'put => Acceso administrador',
        data: response.dataProduct,
        status: 'OK'
      });
    } else {
      res.json({
        message: 'put => Acceso administrador',
        data: [],
        status: 'ERROR'
      });
    }
  } else {
    res.json({
      error: -1,
      descripcion: 'ruta /:id método "PUT" no autorizada'
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const objQuery = req.query;
  const isAdmin: Boolean = Object.keys(objQuery).length === 0 
    ? false 
    : objQuery.admin === 'true' ? true : false;
  
  if (isAdmin) {
    const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
    const response = await objProducts.deleteById(id);
  
    if (response.status === 1) {
      res.json({
        message: response.message,
        data: {},
        status: 'OK'
      });
    } else {
      res.json({
        message: response.message,
        data: {},
        status: 'ERROR'
      });
    }
  } else {
    res.json({
      error: -1,
      descripcion: 'ruta /:id método "DELETE" no autorizada.'
    });
  }
});

export default router;
