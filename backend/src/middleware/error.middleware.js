const ApiResponse = require('../utils/apiResponse.utils');

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  if (err.code === 'P2002') {
    const target = err.meta?.target || 'Field';
    return ApiResponse.error(res, `Duplicate entry error: ${target} already exists.`, 409);
  }

  if (err.code === 'P2025') {
    return ApiResponse.error(res, 'Requested record was not found.', 404);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(res, message, statusCode, process.env.NODE_ENV === 'development' ? err.stack : null);
};

module.exports = errorHandler;
