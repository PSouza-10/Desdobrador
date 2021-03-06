const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ msg: "Autentication failed" });

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded;

    return next();
  } catch (e) {
    return res.status(400).json({ msg: "Invalid Token" });
  }
}

module.exports = auth;
