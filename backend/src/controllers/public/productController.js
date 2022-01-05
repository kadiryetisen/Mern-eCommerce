const asyncHandler = require('express-async-handler');
const { paginateProducts, findProduct, productCounter } = require('../../selectors/productSelector');

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const products = await paginateProducts(pageSize, page);
    const count = await productCounter();
    return res.status(201).json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
});

exports.getDetailPage = asyncHandler(async (req, res) => {
  try {
    const product = await findProduct(req.params.id);
    res.status(201).json(product);
  } catch (err) {
    next({ message: err.message, status: 409 });
  }
});
