const bcrypt = require("bcrypt");

function validatePassword(requestPassword, dbPassword) {
  return bcrypt.compare(requestPassword, dbPassword);
}

module.exports = {
  validatePassword,
};
