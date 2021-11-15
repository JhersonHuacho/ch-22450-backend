import express, { Application } from 'express';
import dotenv from 'dotenv';
import productsRouters from './routers/productos';
import carritoRouters from './routers/carritos';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

// Body parsing Middleware
app.use(express.json());

// Routes
app.use('/api/productos', productsRouters);
app.use('/api/carrito', carritoRouters );

app.listen(port, () => {
  console.log(`Server run http://localhost:${port}`);
});
