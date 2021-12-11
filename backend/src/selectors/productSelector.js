const Product = require('../models/productModel');

//sf
const createProduct = async (newProduct) => {
  const newOne = await Product.create({ ...newProduct });
  if (newOne) {
    return newOne;
  }
  throw new Error('Product was not created');
};

const findProduct = async (_id) => {
  const product = await Product.findById(_id);
  if (product) {
    return product;
  }
  throw new Error('Product not Found, please check product ID');
};
const findAllProducts = async () => {
  const products = await Product.find({});

  if (products !== null) {
    return products;
  }

  throw new Error('Products not Found');
};

//sf
const paginateProducts = async (pageSize, page) => {
  const products = await Product.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (products) {
    return products;
  }

  throw new Error('Products not Found');
};
//sf
const deleteProduct = async (id) => {
  const product = await Product.findOne({ _id: id });

  if (product !== null) {
    await product.remove();
    return;
  }

  throw new Error('Product not found');
};

//Update
const updateProduct = async (oldProduct, updateInfo) => {
  const updatedProduct = await Product.findOneAndUpdate(
    { oldProduct },
    { $set: { ...updateInfo } },
    {
      new: true,
    }
  );

  if (updatedProduct && updatedProduct !== oldProduct) {
    return updatedProduct;
  }

  throw new Error('Product not be updated');
};

const productCounter = async () => {
  const quantity = await Product.countDocuments();

  if (quantity !== null) {
    return quantity;
  }

  throw new Error('Products not Found');
};

module.exports = {
  createProduct,
  updateProduct,
  paginateProducts,
  findProduct,
  deleteProduct,
  findAllProducts,
  productCounter,
};
