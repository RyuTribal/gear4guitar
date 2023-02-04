var jwt = require("jsonwebtoken");

module.exports = {
  jwtauth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json("no token, authorization denied");
    }
    try {
      const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      req.user = user.id;
      next();
    } catch (error) {
      return res.status(401).json("no token, authorization denied");
    }
  },
};