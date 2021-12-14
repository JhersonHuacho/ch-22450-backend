import { Request, Response, Router } from 'express';
// import ContenedorProducto from '../utilitario/Producto';
// const Contenedor = require('../utilitario/fileSystem.ts');
import { productosDao as productosApi } from '../daos/index';
import isAdmin from '../middlewares/validateAdminMiddleware';

const router = Router();
// const objProducts = new ContenedorProducto('db');
// const administrador: boolean;

router.get('/', async (req, res) => {
  const response = await productosApi.getAll();
  res.json(response);
})

router.get('/:id', async (req: Request, res: Response) => {
  const productos = await productosApi.getById(req.params.id);
  res.json(productos);
});

router.post('/', isAdmin, async (req: Request, res: Response) => {
  res.json(await productosApi.save(req.body));
});

router.put('/:id', isAdmin, async (req: Request, res: Response) => {
  res.json(await productosApi.update(req.body));
});

router.delete('/:id', isAdmin, async (req: Request, res: Response) => {
  res.json(await productosApi.deleteById(req.params.id));
});

export default router;
