const Model = require(`../models/index`);

class ControllerModel {
  static create(req, res, next) {
    Model.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Model.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(next);
  }

  static detail(req, res, next) {
    Model.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          res.status(400).json({ message: `that is not exists` });
        }
      })
      .catch(next);
  }

  static user(req, res, next) {
    Model.find({ userId: req.user._id })
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static all(req, res, next) {
    Model.find({})
      .then(founds => {
        res.status(200).json(founds);
      })
      .catch(next);
  }

  static update(req, res, next) {
    Model.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(next);
  }
}

module.exports = ControllerModel;
