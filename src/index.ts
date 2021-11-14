import express from 'express';
import productsRouters from './routers/productos';
import carritoRouters from './routers/carritos';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Routes
app.use('/api/productos', productsRouters);
app.use('/api/carrito', carritoRouters );

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
