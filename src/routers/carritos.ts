import { Request, Response, Router } from 'express';
import ContenedorCarrito from '../utilitario/Carrito';
const router = Router();
const objCarrito = new ContenedorCarrito('db');


router.get('/:id/productos', async (req: Request, res: Response) => {
  const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const response = await objCarrito.getProductosPorCarrito(id);

  if (response.status === 1) {
    res.json({
      message: response.message,
      data: response.dataProducts,
      status: 'OK'
    });
  } else  {
    res.json({
      message: response.message,
      data: [],
      status: response.status === -1 ? 'Validación' : 'ERROR'
    });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const response = await objCarrito.saveCarrito();

  if (response.status === 1)
  {
    res.json({
      message: response.message,
      data: {
        idCarrito: response.dataCarritoId
      },
      status: 'OK'
    });
  } else {
    res.json({
      message: response.message,
      data: {
        idCarrito: response.dataCarritoId
      },
      status: 'OK'
    });
  }
  
});

router.post('/:id/productos', async (req: Request, res: Response) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const response = await objCarrito.saveProductoAlCarrito(idCarrito, req.body);

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
      status: 'ERROR'
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);

  const response = await objCarrito.deleteCarritoPorId(idCarrito);

  if (response.status === 1) {
    res.json({
        message: response.message,
        data: [],
        status: 'OK'
    });
  } else {
    res.json({
      message: response.message,
      data: [],
      status: 'ERROR'
    });
  }
  
});

router.delete('/:id/productos/:id_prod', async (req: Request, res: Response) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const idProducto = req.params.id_prod === undefined ? -1 : parseInt(req.params.id_prod);
  const response = await objCarrito.deleteProductoDelCarrito(idCarrito, idProducto);

  if (response.status === 1) {
    res.json({
      message: response.message,
      data: [],
      status: 'OK'
    });
  } else {
    res.json({
      message: response.message,
      data: [],
      status: 'ERROR'
    });
  }
  
});

export default router;
