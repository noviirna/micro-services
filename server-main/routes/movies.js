const express = require("express");
const axios = require("axios");
const redis = require("redis"),
  client = redis.createClient();
const router = express.Router();
const { SERVER_MOVIES } = process.env;

// GET ALL MOVIES
router.get("/", function(req, res) {
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

        let info = "data not available";
        if (movies.data.length > 1) {
          info = "movies found";
        }
        let result = {
          movies: {
            info,
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

router.get("/user", function(req, res) {
  client.get("favoritemovies", async function(err, favoritemovies) {
    if (favoritemovies) {
      res.status(200).json(JSON.parse(favoritemovies));
    } else {
      try {
        let movies = await axios({
          method: "GET",
          url: SERVER_TV,
          headers: req.headers,
          data: req.body
        });
        let info = "data not available";
        if (movies.data.length > 1) {
          info = "tv series found";
        }
        let result = {
          movies: {
            info,
            data: [...movies.data]
          }
        };
        client.set("favoritemovies", JSON.stringify(result), "EX", 15);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err);
      }
    }
  });
});

router.post("/", async function(req, res) {
  try {
    let movie = await axios({
      method: "POST",
      url: SERVER_MOVIES,
      headers: req.headers,
      data: req.body
    });

    let result = {
      movies: {
        info: "data successfully added",
        data: movie.data
      }
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete("/:id", async function(req, res) {
  try {
    let movie = await axios({
      method: "DELETE",
      url: SERVER_MOVIES + "/" + req.params.id,
      headers: req.headers,
      data: req.body
    });

    let result = {
      movie: {
        info: "data successfully deleted",
        data: movie.data
      }
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/:id", async function(req, res) {
  try {
    let movie = await axios({
      method: "GET",
      url: SERVER_MOVIES + "/" + req.params.id,
      headers: req.headers,
      data: req.body
    });
    let info = `movie with id ${req.params.id} not found`;
    if (movie.data) {
      info = `movie with id ${req.params.id} found`;
    }

    let result = {
      movie: {
        info,
        data: movie.data
      }
    };
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.patch("/:id", async function(req, res) {
  try {
    let movie = await axios({
      method: "PATCH",
      url: SERVER_MOVIES + "/" + req.params.id,
      headers: req.headers,
      data: req.body
    });

    let result = {
      movie: {
        info: "data successfully updated",
        data: movie.data
      }
    };
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/seeds", async function(req, res) {
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
