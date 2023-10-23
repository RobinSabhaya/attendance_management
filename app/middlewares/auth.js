const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const auth = async (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    if (req?.body?.headers?.authorization) {
      authHeader = req?.body?.headers?.authorization;
    }
    if (!authHeader) {
      return res.json({
        status: 401,
        message: "unauthorized",
      });
    }
    if (authHeader.slice(0, 6) === "Bearer") {
      const { id, role } = await jwt.verify(
        authHeader.split(" ")[1],
        JWT_SECRET
      );
      req.user = {
        id,
        role,
      };
      next();
    } else {
      return res.json({
        status: 400,
        message: "Invalid token",
      });
    }
  } catch (err) {
    return res.json({
      status: 400,
      message: err.message,
    });
  }
};
module.exports = auth;
