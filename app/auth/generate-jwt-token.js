const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(payload) {
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = "1h";

  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
}

module.exports = { generateToken };
