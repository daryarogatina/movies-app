const { User } = require("../models/index.js");
const { generateToken } = require("./generate-jwt-token.js");
const { comparePasswords } = require("./compare-password.js");
const { authenticationError } = require("../helpers/index.js");

const createSession = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json(authenticationError);
    }

    const isMatch = await comparePasswords(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json(authenticationError);
    }

    const payload = {
      email: existingUser.email,
      name: existingUser.name,
    };

    const token = generateToken(payload);

    return res.status(200).json({
      token: token,
      status: 1,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createSession };
