// 404 not found error handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
//custom error handler
const errorHandler = (err, req, res, next) => {
  const statusCode = err.status ? err.status : 500;
  res.status(statusCode).json({
    message: err.message,
  });
};

module.exports = { notFound, errorHandler };
