const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: function(user) {
    return jwt.sign(user, process.env.SECRET_JWT);
  },
  decodeToken: function(token) {
    return jwt.verify(token, process.env.SECRET_JWT);
  }
};
