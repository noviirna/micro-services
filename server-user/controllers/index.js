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
            res.status(200).json({ token, user: JSON.stringify(user) });
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
    User.findById(req.user._id)
      .then(user => {
        if (user) {
          let { favoriteMovies } = user;
          let input = req.params.id;
          if (favoriteMovies.indexOf(input) === -1) {
            user.favoriteMovies.push(input);
          }

          return User.findByIdAndUpdate(req.user._id, {
            favoriteMovies: user.favoriteMovies
          });
        } else {
          next({ code: 400, message: `password / email wrong` });
        }
      })
      .then(result => {
        return User.findById(req.user._id)
          .populate("favoriteMovies")
          .populate("favoriteSeries");
      })
      .then(result => {
        let { favoriteMovies, favoriteSeries } = result;
        res.status(200).json({ favoriteMovies, favoriteSeries });
      })
      .catch(next);
  }

  static removefavoritemovie(req, res, next) {
    User.findById(req.user._id)
      .then(user => {
        if (user) {
          let { favoriteMovies } = user;
          let input = req.params.id;
          if (favoriteMovies.indexOf(input) !== -1) {
            user.favoriteMovies.splice(favoriteMovies.indexOf(input), 1);
          }
          return User.findByIdAndUpdate(req.user._id, {
            favoriteMovies: user.favoriteMovies
          });
        } else {
          next({ code: 400, message: `password / email wrong` });
        }
      })
      .then(result => {
        return User.findById(req.user._id)
          .populate("favoriteMovies")
          .populate("favoriteSeries");
      })
      .then(result => {
        let { favoriteMovies, favoriteSeries } = result;
        res.status(200).json({ favoriteMovies, favoriteSeries });
      })
      .catch(next);
  }

  static addfavoriteseries(req, res, next) {
    let input = req.params.id;
    User.findById(req.user._id)
      .then(user => {
        if (user) {
          if (!user.favoriteSeries) {
            user.favoriteSeries = [];
          }
          let { favoriteSeries } = user;
          if (favoriteSeries.indexOf(input) === -1) {
            user.favoriteSeries.push(input);
          }
          console.log(favoriteSeries.length);
          if (favoriteSeries.length === 0) {
            user.favoriteSeries.push(input);
          }
          console.log("disini lagi", user);
          return User.findByIdAndUpdate(req.user._id, {
            favoriteSeries: user.favoriteSeries
          });
        } else {
          next({ code: 401, message: `unauthorized access` });
        }
      })
      .then(result => {
        return User.findById(req.user._id)
          .populate("favoriteMovies")
          .populate("favoriteSeries");
      })
      .then(result => {
        let { favoriteMovies, favoriteSeries } = result;
        res.status(200).json({ favoriteMovies, favoriteSeries });
      })
      .catch(next);
  }

  static removefavoriteseries(req, res, next) {
    User.findById(req.user._id)
      .then(user => {
        if (user) {
          if (!user.favoriteSeries) {
            user.favoriteSeries = [];
          }
          let { favoriteSeries } = user;
          let input = req.params.id;
          if (favoriteSeries.indexOf(input) !== -1) {
            user.favoriteSeries.splice(favoriteSeries.indexOf(input), 1);
          }
          return User.findByIdAndUpdate(req.user._id, {
            favoriteSeries: user.favoriteSeries
          });
        } else {
          next({ code: 401, message: `unauthorized access` });
        }
      })
      .then(result => {
        return User.findById(req.user._id)
          .populate("favoriteMovies")
          .populate("favoriteSeries");
      })
      .then(result => {
        let { favoriteMovies, favoriteSeries } = result;
        res.status(200).json({ favoriteMovies, favoriteSeries });
      })
      .catch(next);
  }

  static getfavoritemovie(req, res, next) {
    User.findById(req.user._id)
      .populate("favoriteMovies")
      .then(user => {
        let { favoriteMovies } = user;
        res.status(200).json({ favoriteMovies });
      })
      .catch(next);
  }

  static getfavoriteseries(req, res, next) {
    User
      .findById(req.user._id)
      .populate("favoriteSeries")
      .then(user => {
        let { favoriteSeries } = user;
        res.status(200).json({ favoriteSeries });
      })
      .catch(next);
  }

  static getfavorite(req, res, next) {
    User.findById(req.user._id)
      .populate("favoriteSeries")
      .populate("favoriteMovies")
      .then(user => {
        let { favoriteMovies, favoriteSeries } = user;
        res.status(200).json({ favoriteMovies, favoriteSeries });
      })
      .catch(next);
  }
}

module.exports = ControllerUser;
