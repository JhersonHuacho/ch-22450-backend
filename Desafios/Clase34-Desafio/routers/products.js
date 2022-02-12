const knex = require('../config/knex/db');
const Product = require('../models/Products');

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
  console.log('/productos');
  if (!req.isAuthenticated()) {
    console.log('Usuario no esta autenticado')
    res.redirect('/login')
    return;
  }

  const name = req.user.usuario;
  console.log('name ' + name);

  let products = await Product.find();
  products = products.map(product => {
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

    const saveProduct = await newProduct.save();
    console.log("Se registro correctamente el producto");
    return saveProduct;
  } catch (error) {
    console.log('Error al guardar => ', error);
  }
}



module.exports = {
  getProducts,
  postProducts
}