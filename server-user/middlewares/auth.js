const jwt = require(`jsonwebtoken`);
const Model = require(`../models/index`);

module.exports = {
  authentication: function(req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
    } catch (err) {
      console.log("catch authentication")
      next({
        code: 401,
        message: `login first!`
      });
    }
  },
  authorization: function(req, res, next) {
    console.log(req.user._id, "ini REQ.USER._ID")
    Model.findById(req.user._id)
      .then(result => {
        if (result) {
          next();
        } else {
          console.log("no result authorization")
          next({
            code: 401,
            message: `access not allowed!`
          });
        }
      })
      .catch(err => {
        console.log("catch authorization")
        next({
          code: 500,
          message: `internal server error!`
        });
      });
  }
};
