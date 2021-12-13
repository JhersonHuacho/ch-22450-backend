let productosDao: any;
let carritosDao: any;
let PERS: string = 'mongodb';
// switch (process.env.PERS) {
switch (PERS) {
  case 'json':
    console.log('PERS => json');
    // const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo');
    // const { default: CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo');

    // productosDao = new ProductosDaoArchivo();
    // carritosDao = new CarritosDaoArchivo();
    // console.log('daos => index.ts => INICIO');

    import('./productos/ProductosDaoArchivo')
      .then(moduleObject => {
        const { default: ProductosDaoArchivo } = moduleObject;
        productosDao = new ProductosDaoArchivo();
      })

    import('./carritos/CarritosDaoArchivo')
      .then(moduleObject => {
        const { default: CarritosDaoArchivo } = moduleObject;
        carritosDao = new CarritosDaoArchivo();
      })
    // console.log('daos => index.ts => FIN');
    break;

  case 'mongodb':
    console.log('PERS => mongodb');

    // const { default: ProductosDaoMongoDb } = await import('./productos/ProductosDaoMongoDb.js')
    // const { default: CarritosDaoMongoDb } = await import('./carritos/CarritosDaoMongoDb.js')

    // productosDao = new ProductosDaoMongoDb()
    // carritosDao = new CarritosDaoMongoDb()

    import('./productos/ProductosDaoMongoDB')
      .then(moduleObject => {
        const { default: ProductosDaoMongoDB } = moduleObject;
        productosDao = new ProductosDaoMongoDB();
      })

    import('./carritos/CarritosDaoMongoDB')
      .then(moduleObject => {
        const { default: CarritosDaoMongoDb } = moduleObject;
        carritosDao = new CarritosDaoMongoDb();
      })
    break;
  case 'firebase':
    // const { default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
    // const { default: CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')

    // productosDao = new ProductosDaoFirebase()
    // carritosDao = new CarritosDaoFirebase()

    import('./productos/ProductosDaoFirebase')
      .then(moduleObject => {
        const { default: ProductosDaoFirebase } = moduleObject;
        productosDao = new ProductosDaoFirebase();
      })

    import('./carritos/CarritosDaoFirebase')
      .then(moduleObject => {
        const { default: CarritosDaoFirebase } = moduleObject;
        carritosDao = new CarritosDaoFirebase();
      })
    break
  default:
    break;
}

export {
  productosDao,
  carritosDao
}