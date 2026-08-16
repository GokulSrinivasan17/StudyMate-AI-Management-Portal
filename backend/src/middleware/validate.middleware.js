const ApiResponse = require('../utils/apiResponse.utils');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error.errors) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return ApiResponse.error(res, 'Validation Error', 400, formattedErrors);
      }
      return ApiResponse.error(res, 'Invalid request data', 400);
    }
  };
};

module.exports = validate;
