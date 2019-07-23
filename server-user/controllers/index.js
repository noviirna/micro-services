const User = require(`../models`);
const { comparePassword } = require(`../helpers/password`);
const { generateToken } = require(`../helpers/token`);

class ControllerUser {
  static register(req, res, next) {
    console.log("here");
    User.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(found => {
        if (found) {
          let { _id, email, password } = found;
          if (comparePassword(req.body.password, password) === true) {
            let user = { _id, email };
            let token = generateToken(user);
            res.status(200).json({ token, user });
          } else {
            next({ code: 400, message: `password / email wrong` });
          }
        } else {
          next({ code: 400, message: `password / email wrong` });
        }
      })
      .catch(next);
  }

  static addfavoritemovie(req, res, next) {
  }

  static removefavoritemovie(req, res, next) {}

  static addfavoriteseries(req, res, next) {}

  static removefavoriteseries(req, res, next) {}
}

module.exports = ControllerUser;
