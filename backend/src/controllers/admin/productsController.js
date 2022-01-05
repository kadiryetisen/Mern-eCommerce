const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const {
  createProduct,
  findProduct,
  updateProduct,
  deleteProduct,
  findAllProducts,
} = require('../../selectors/productSelector');

exports.checkValidProduct = asyncHandler(async (req, res, next) => {
  try {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      let errorList = { message: {} };
      await expressErrors.array().forEach((err) => (errorList.message[err.param] = err.msg));
      return res.status(400).json(errorList);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  next();
});

//CRUD OPERATIONS
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);

    if (newProduct) {
      return res.status(201).json({
        newProduct,
        message: 'Product has been uploaded',
      });
    }
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
});

exports.getProductsForPanelList = asyncHandler(async (req, res) => {
  try {
    const products = await findAllProducts();

    if (products) {
      res.status(201).json(products);
    }
  } catch (err) {
    next({ message: err.message, status: 401 });
  }
});

exports.getSingleProductToEdit = asyncHandler(async (req, res) => {
  try {
    const product = await findProduct(req.params.id);
    res.status(201).json(product);
  } catch (err) {
    next({ message: err.message, status: 409 });
  }
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    const lastProductList = await findAllProducts();
    res.status(201).json({ message: 'Product removed', products: lastProductList });
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
});

exports.updateProduct = asyncHandler(async (req, res) => {
  try {
    const updateInfo = req.body;
    const oldProduct = await findProduct(req.params.id);
    const updatedProduct = await updateProduct(oldProduct, updateInfo);
    res.status(201).json({ updatedProduct, message: 'Product has been updated' });
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
});
