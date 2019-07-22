const express = require("express");
const axios = require("axios");
const redis = require("redis"),
  client = redis.createClient();
const router = express.Router();
const { SERVER_TV } = process.env;

router.get("/", function(req, res, next) {
  client.get("series", async function(err, series) {
    if (series) {
      res.status(200).json(JSON.parse(series));
    } else {
      try {
        let tvseries = await axios({
          method: "GET",
          url: SERVER_TV,
          headers: req.headers,
          data: req.body
        });
        let msgtv = "data not available";
        if (tvseries.data.length > 1) {
          msgtv = "tv series found";
        }
        let result = {
          series: {
            info: msgtv,
            data: [...tvseries.data]
          }
        };
        client.set("series", JSON.stringify(result), "EX", 15);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err.message);
      }
    }
  });
});

router.get("/user", function(req, res, next) {
  client.get("favoriteseries", async function(err, favoriteseries) {
    if (favoriteseries) {
      res.status(200).json(JSON.parse(favoriteseries));
    } else {
      try {
        let tvseries = await axios({
          method: "GET",
          url: SERVER_TV + "/user",
          headers: req.headers,
          data: req.body
        });
        let msgtv = "data not available";
        if (tvseries.data.length > 1) {
          msgtv = "tv series found";
        }
        let result = {
          series: {
            info: msgtv,
            data: [...tvseries.data]
          }
        };
        client.set("favoriteseries", JSON.stringify(result), "EX", 15);
        res.status(200).json(result);
      } catch (err) {
        res.status(400).json(err.message);
      }
    }
  });
});

router.get("/seeds", async function(req, res, next) {
  try {
    let series = await axios({
      method: "GET",
      url: SERVER_TV + "/seeds",
      headers: req.headers,
      data: req.body
    });
    res.status(200).json(series.data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
