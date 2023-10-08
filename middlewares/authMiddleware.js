const jwt = require("jsonwebtoken");
const authenticationMiddleware = async (req, res, next) => {
  try {
    const authHeaders = req.headers.token;
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      return res.json({ status: 404, message: "Bearer token error" });
    }
    const token = authHeaders.split(" ")[1];

    const verified = await jwt.verify(token, process.env.JWT_KEY);
    if (verified) {
      const { id, email } = verified;
      req.user = { id, email };

      next();
    }
  } catch (error) {
    return res.json({ status: 500, message: `${error.message}` });
  }
};
