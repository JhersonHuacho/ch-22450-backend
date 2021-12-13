import { Request, Response, Router } from 'express';
// import ContenedorCarrito from '../utilitario/Carrito';
import { carritosDao as carritosApi, productosDao as productosApi } from '../daos/index';
const router = Router();
// const objCarrito = new ContenedorCarrito('db');

// Router de carritos
router.get('/', async (req: Request, res: Response) => {
  // res.json((await carritosApi.getAll()).map((c: any) => c.id));
  res.json(await carritosApi.getAll());
});

router.post('/', async (req: Request, res: Response) => {
  res.json(await carritosApi.save(req.body))
});

router.delete('/:id', async (req: Request, res: Response) => {
  res.json(await carritosApi.deleteById(req.params.id))
});

// Router de productos en carrito
router.get('/:id/productos', async (req: Request, res: Response) => {
  const carrito = await carritosApi.getById(req.params.id);
  console.log('get => /:id/productos => carrito', carrito)
  console.log('get => /:id/productos => carrito', JSON.stringify(carrito.productos))
  // res.json(JSON.stringify(carrito.productos));
  res.json(carrito[0].productos);
});

router.post('/:id/productos', async (req: Request, res: Response) => {
  const carrito = await carritosApi.getById(req.params.id)
  const producto = await productosApi.getById(req.body.id)
  carrito.productos.push(producto)
  await carritosApi.update(carrito)
  res.end()
});

router.delete('/:id/productos/:id_prod', async (req: Request, res: Response) => {
  const carrito = await carritosApi.getById(req.params.id)
  const index = carrito.productos.findIndex((p: any) => p.id == req.params.id_prod)
  if (index != -1) {
      carrito.productos.splice(index, 1)
      await carritosApi.update(carrito)
  }
  res.end()
});
export default router;
