const express = require("express");
const axios = require("axios");
const redis = require("redis"),
  client = redis.createClient();
const router = express.Router();
const { SERVER_MOVIES } = process.env;

// GET ALL MOVIES
router.get("/", function(req, res, next) {
  client.get("movies", async function(err, movies) {
    if (movies) {
      res.status(200).json(JSON.parse(movies));
    } else {
      try {
        let movies = await axios({
          method: "GET",
          url: SERVER_MOVIES,
          headers: {
            ...req.headers
          },
          data: req.body
        });

        let msgmovie = "data not available";
        if (movies.data.length > 1) {
          msgmovie = "movies found";
        }
        let result = {
          movies: {
            info: msgmovie,
            data: [...movies.data]
          }
        };
        client.set("movies", JSON.stringify(result), "EX", 15);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err.message);
      }
    }
  });
});

router.get("/user", function(req, res, next) {
  client.get("favoritemovies", async function(err, favoritemovies) {
    if (favoritemovies) {
      res.status(200).json(JSON.parse(favoritemovies));
    } else {
      try {
        let movies = await axios({
          method: "GET",
          url: SERVER_MOVIES + "/user",
          headers: req.headers,
          data: req.body
        });

        let msgmovie = "data not available";
        if (movies.data.length > 1) {
          msgmovie = "movies found";
        }
        let result = {
          movies: {
            info: msgmovie,
            data: [...movies.data]
          }
        };
        client.set("favoritemovies", JSON.stringify(result), "EX", 15);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err.message);
      }
    }
  });
});

router.get("/seeds", async function(req, res, next) {
  try {
    let movies = await axios({
      method: "GET",
      url: SERVER_MOVIES + "/seeds",
      headers: req.headers,
      data: req.body
    });
    res.status(200).json(movies.data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
