const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authenticateTokenError } = require("../helpers/index.js");

const authenticateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json(authenticateTokenError);
  }

  jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({ error: "Invalid JWT token." });
    }

    next();
  });
};

module.exports = { authenticateToken };
