const express = require("express");
const axios = require("axios");
const redis = require("redis"),
  client = redis.createClient();
const router = express.Router();
const { SERVER_USER } = process.env;

router.post("/register", function(req, res, next) {
  let { username, password } = req.body;
  axios({
    method: "POST",
    url: SERVER_USER + "/register",
    data: { username, password }
  })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/login", function(req, res, next) {
  let { username, password } = req.body;
  axios({
    method: "POST",
    url: SERVER_USER + "/login",
    data: { username, password }
  })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
