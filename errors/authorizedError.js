const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./cutomError");
class AuthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = AuthorizedError;
