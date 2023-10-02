const { User } = require("../models/index.js");
const { generateToken } = require("./generate-jwt-token.js");
const { hashPassword } = require("./hash-password.js");
const { existingUserError } = require("../helpers/index.js");

const createUser = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json("Password doesn't match.");
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json(existingUserError);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const payload = {
      email: newUser.email,
      name: newUser.name,
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

module.exports = { createUser };
