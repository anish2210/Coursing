const jwt = require("jsonwebtoken");
require("dotenv").config();
const ADMIN_JWT_SIGN = process.env.ADMIN_JWT_SIGN;

function adminMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, ADMIN_JWT_SIGN);

    if (decoded) {
      req.adminId = decoded.id;
      next();
    } else {
      return res.json({
        error: "Oops..User not verified!",
      });
    }
  } catch (error) {
    console.error("Middleware error: ", error);
    res.json({
        MiddlewareError:error
    })
  }
}

module.exports = { adminMiddleware };
