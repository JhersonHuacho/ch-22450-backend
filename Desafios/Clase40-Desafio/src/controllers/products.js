const knex = require('../config/knex/db');
//const { obtenerProductos, guardarProducto } = require('../services/productServices');
const { ProductosApi } = require("../services/productServices");

const getProductsKnex = (req, res) => {
  console.log('/productos');
  // if (!req.session.name) {
  if (!req.isAuthenticated()) {
    console.log('Usuario no esta autenticado')
    res.redirect('/login')
    return;
  }
  // console.log('req.user')
  // console.log(req.user)
  const name = req.user.usuario;
  console.log('name ' + name);
  knex
    .from('product')
    .select('id', 'title', 'price', 'thumbnail')
    .then(products => {
      // console.log('products', products);
      let listExists = false;
      if (products.length !== 0) {
        listExists = true;
      }
      res.render('main', {
        layout: 'index',
        data: products,
        listExists: listExists,
        user: name
      });
    })
}

const postProductsKnex = (req, res) => {
  console.log('req => ', req);
  const data = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail
  }
  knex('product')
    .insert(data)
    .then(() => {
      console.log("Se registro correctamente el producto");
      res.json(data)
    })
    .catch((error) => {
      console.log('Error al guardar => ', error);
    });
}

const getProducts = async (req, res) => {
  console.log('/productos', req.isAuthenticated());
  if (!req.isAuthenticated()) {
    console.log('Usuario no esta autenticado')
    res.redirect('/auth/login')
    return;
  }

  const name = req.user.usuario;
  console.log('name ' + name);

  const productoApi = new ProductosApi();
  //const listProducts = await obtenerProductos();
  const listProducts = await productoApi.getAll();

  const products = listProducts.map(product => {
    return {
      id: product._id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    }
  });
  // console.log(products)

  let listExists = false;
  if (products.length !== 0) {
    listExists = true;
  }

  res.render('main', {
    layout: 'index',
    data: products,
    listExists: listExists,
    user: name
  });

}

const postProducts = async (req, res) => {
  try {
    // console.log('req => ', req);
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail
    })
    const productoApi = new ProductosApi();
    const saveProduct = await productoApi.add(newProduct);
    console.log("Se registro correctamente el producto");
    return saveProduct;
  } catch (error) {
    console.log('Error al guardar => ', error);
  }
}

module.exports = {
  getProductsKnex,
  postProductsKnex,
  getProducts,
  postProducts
}