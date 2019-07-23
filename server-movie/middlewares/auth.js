const jwt = require(`jsonwebtoken`);
const Model = require(`../models/index`);

module.exports = {
  authentication: function(req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
    } catch (err) {
      next({
        code: 401,
        message: `login first!`
      });
    }
  },
  authorization: function(req, res, next) {
    let condition = {
      _id: req.params.id,
      userId: req.user._id
    };

    console.log(condition);

    Model.findOne(condition)
      .then(result => {
        if (result) {
          next();
        } else {
          next({
            code: 401,
            message: `access not allowed!`
          });
        }
      })
      .catch(err => {
        next({
          code: 500,
          message: `internal server error!`
        });
      });
  }
};
