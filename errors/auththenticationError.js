const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./cutomError");
class AuthenticationError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = AuthenticationError;
