### Documentación:

##### Comandos a ejecutar
1. Para compilar de TS a JS
```bash
npm run build
```
2. Ejecutar el proyecto
```bash
npm run dev-ts
```
o
```bash
npm run dev-js
```
#### Rutas:
##### Productos
- GET: /api/productos
- GET: /api/productos/2
- POST: /api/productos
- PUT: /api/productos
- DEL: /api/productos/2

- POST: /api/productos?admin=true
- PUT: /api/productos?admin=true
- DEL: /api/productos/2?admin=true
##### Carrito

- GET: /api/carrito/1/productos
- POST: /api/carrito
- DEL: /api/carrito/1/productos/2
- DEL: /api/carrito/4
- POST: /api/carrito/2/productos

#### Recursos utilizados

Como usar Typescript con NodeJS:
https://www.section.io/engineering-education/how-to-use-typescript-with-nodejs/
https://dev.to/roycechua/setup-a-node-express-api-with-typescript-2021-11o1
