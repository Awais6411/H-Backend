const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  const customMessage = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again",
  };

  return res.json({
    status: customMessage.status,
    message: customMessage.message,
  });
};
module.exports = errorHandlerMiddleware;
