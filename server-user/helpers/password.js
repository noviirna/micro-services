const bcrypt = require("bcryptjs");
module.exports = {
  hashPassword: function(str) {
    let salt = bcrypt.genSaltSync(3);
    return bcrypt.hashSync(str, salt);
  },
  comparePassword: function(pass, hash) {
    return bcrypt.compareSync(pass, hash);
  },
  randomPassword: function() {
    let length = Math.floor(Math.random() * (16 - 8 + 1) + 8);
    var result = "";
    var characters =
      `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=-` +
      "`" +
      `[]\;',./~!@#$%^&*()_+{}|:"<>?`;

    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
};
