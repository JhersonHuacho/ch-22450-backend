import { Router } from 'express';
import Contenedor from '../utilitario/contenedor';
// const Contenedor = require('../utilitario/fileSystem.ts');

const router = Router();
const objProducts = new Contenedor('db');

router.get('/:id?', async (req, res) => {
  const id: number = req.params.id === undefined ? -1 : parseInt(req.params.id);
  // console.log('params', req.params);
  console.log('params id', id);
  if (id === -1) {
    const products = await objProducts.getAll();

    res.json({
      message: 'get => Acceso usuario y administrador',
      data: products,
    });
  }

  const product = await objProducts.getById(id);
  res.json({
    data: product,
    message: 'get id => Acceso usuario y administrador',
  });
});

router.post('/', async (req, res) => {
  console.log('req.body', req.body);
  const product = await objProducts.save(req.body);
  res.json({
    message: 'post => Acceso administrador',
    data: product
  });
});

router.put('/:id', (req, res) => {
  res.json({
    message: 'put => Acceso administrador',
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    message: 'delete => Acceso administrador',
  });
});

export default router;
