const bcrypt = require("bcrypt");

async function comparePasswords(enteredPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;
}

module.exports = { comparePasswords };
