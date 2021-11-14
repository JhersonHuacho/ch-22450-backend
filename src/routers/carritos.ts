import { Router } from 'express';
import ContenedorCarrito from '../utilitario/Carrito';
const router = Router();
const objCarrito = new ContenedorCarrito('db');

router.get('/:id/productos', async (req, res) => {
  const id = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const listProductos = await objCarrito.getProductosPorCarrito(id);

  res.json({
    message: 'Me permite listar todos los productos guardados en el carrito',
    data: listProductos,
    status: 'OK'
  });
});

router.post('/', async (req, res) => {
  const idCarrito = await objCarrito.saveCarrito();

  res.json({
    message: 'Crea un carrito y devuelve su id',
    data: {
      idCarrito: idCarrito
    },
    status: 'OK'
  });
});

router.post('/:id/productos', async (req, res) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const product = await objCarrito.saveProductoAlCarrito(idCarrito, req.body);

  res.json({
    message: 'Para incorporar productos al carrito por su id de producto',
    data: product,
    status: 'OK'
  });
});

router.delete('/:id', async (req, res) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);

  const status = await objCarrito.deleteCarritoPorId(idCarrito);

  if (status) {
    res.json({
        message: 'Elimina un producto del carrito por su id de carrito y de producto',
        data: [],
        status: 'OK'
    });
  } else {
    res.json({
      message: 'Elimina un producto del carrito por su id de carrito y de producto',
      data: [],
      status: 'ERROR'
    });
  }
  
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
  const idCarrito = req.params.id === undefined ? -1 : parseInt(req.params.id);
  const idProducto = req.params.id_prod === undefined ? -1 : parseInt(req.params.id_prod);
  const status = await objCarrito.deleteProductoDelCarrito(idCarrito, idProducto);

  if (status) {
    res.json({
      message: 'Elimina un producto del carrito por su id de carrito y de producto',
      data: [],
      status: 'OK'
    });
  } else {
    res.json({
      message: 'Elimina un producto del carrito por su id de carrito y de producto',
      data: [],
      status: 'ERROR'
    });
  }
  
});

export default router;
