
const errorMiddleware = (error, req, res, next) => {
  const status = error.status || 500;
  const errorItem = {
    message: error.message,
    details: error.details
  };

  const errorResponse = {
    error: true,
    status,
    error_details: errorItem
  };
  return res.status(status).json(errorResponse);
};

export default errorMiddleware;