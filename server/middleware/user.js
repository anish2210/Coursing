const jwt = require("jsonwebtoken");
require("dotenv").config();
const USER_JWT_SIGN = process.env.USER_JWT_SIGN;

function userMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, USER_JWT_SIGN);

    if (decoded) {
      req.userId = decoded.id;
      console.log("matched token success");
      next();
    } else {
      return res.json({
        error: "Oops..User not verified!",
      });
    }
  } catch (error) {
    console.error("Middleware Error: ", error);
    res.json({
      MiddlewareError: error,
    });
  }
}

module.exports = { userMiddleware };
