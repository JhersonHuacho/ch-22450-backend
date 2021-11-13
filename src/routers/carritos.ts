import { Router } from 'express';

const router = Router();

router.get('/:id/productos', (req, res) => {
  res.json({
    message: 'Me permite listar todos los productos guardados en el carrito',
  });
});

router.post('/', (req, res) => {
  res.json({
    message: 'Crea un carrito y devuelve su id',
  });
});

router.post('/:id/productos', (req, res) => {
  res.json({
    message: 'Para incorporar productos al carrito por su id de producto',
  });
});

router.delete('/:id/productos/:id_prod', (req, res) => {
  res.json({
    message: 'Elimina un producto del carrito por su id de carrito y de producto',
  });
});

export default router;
