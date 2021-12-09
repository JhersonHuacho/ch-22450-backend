require('./db');

const Product = require('./models/Productos');

// SAVE
const saveProduct = async () => {
  let pr = new Product({
    name: 'Tablet Tres',
    description: 'Es de color negro de ultima generación',
    price: 40025
  })

  const productSave = await pr.save();
  return productSave;
}

// saveProduct()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

// console.log(saveProduct());

// READ
const getAllProducts = async () => {
  const products = await Product.find();
  return products;
}

getAllProducts()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

const getOneProduct = async () => {
  const product = await Product.findOne({
    _id: '61ae9702ea565d74103a95b0'
  })

  return product;
}

getOneProduct()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })


const updateProduct = async () => {
  const productUpdate = await Product.findOneAndUpdate({ _id: '61ae9702ea565d74103a95b0' }, { name: 'Cambio de nombre en el producto' })
  return productUpdate;
}

// updateProduct()
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })


const deleteProduct = async () => {
  const productDelete = await Product.findOneAndDelete({ _id: '61ae9702ea565d74103a95b0' });
  return productDelete;
}

// deleteProduct()
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {

//     console.log(err)
//   })

const deleteAllProduct = async () => {
  const productDelete = Product.deleteMany({ name: 'Tablet Dos' });
  return productDelete;
}

deleteAllProduct()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })




