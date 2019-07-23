const express = require("express");
const axios = require("axios");
const redis = require("redis"),
  client = redis.createClient();
const router = express.Router();
const { SERVER_MOVIES, SERVER_TV, SERVER_USER } = process.env;

const user = require(`./user`);
const movies = require(`./movies`);
const series = require(`./series`);

router.use(`/movies`, movies);
router.use(`/series`, series);

router.use(`/`, user);

// router.get("/", function(req, res) {
//   client.get("info", async function(err, info) {
//     if (info) {
//       res.status(200).json(JSON.parse(info));
//     } else {
//       try {
//         let movies = await axios({
//           url: SERVER_MOVIES,
//           headers: {
//             ...req.headers
//           },
//           data: {
//             ...req.data
//           }
//         });
//         let tvseries = await axios({
//           url: SERVER_TV,
//           headers: {
//             ...req.headers
//           },
//           data: {
//             ...req.data
//           }
//         });
//         let msgmovie = "data not available";
//         let msgtv = "data not available";
//         if (movies.data.length > 1) {
//           msgmovie = "movies found";
//         }
//         if (tvseries.data.length > 1) {
//           msgtv = "tv series found";
//         }
//         let result = {
//           movies: {
//             info: msgmovie,
//             data: [...movies.data]
//           },
//           series: {
//             info: msgtv,
//             data: [...tvseries.data]
//           }
//         };
//         client.set("info", JSON.stringify(result), "EX", 15);
//         res.status(200).json(result);
//       } catch (err) {
//         res.status(400).json(err.message);
//       }
//     }
//   });
// });

// router.get("/user", function(req, res) {
//   client.get("favorites", async function(err, favorites) {
//     if (favorites) {
//       res.status(200).json(JSON.parse(favorites));
//     } else {
//       try {
//         let movies = await axios({
//           url: SERVER_MOVIES + "/user",
//           headers: {
//             ...req.headers
//           },
//           data: {
//             ...req.data
//           }
//         });
//         let tvseries = await axios({
//           url: SERVER_TV + "/user",
//           headers: {
//             ...req.headers
//           },
//           data: {
//             ...req.data
//           }
//         });
//         let msgmovie = "data not available";
//         let msgtv = "data not available";
//         if (movies.data.length > 1) {
//           msgmovie = "movies found";
//         }
//         if (tvseries.data.length > 1) {
//           msgtv = "tv series found";
//         }
//         let result = {
//           movies: {
//             info: msgmovie,
//             data: [...movies.data]
//           },
//           series: {
//             info: msgtv,
//             data: [...tvseries.data]
//           }
//         };
//         client.set("favorites", JSON.stringify(result), "EX", 15);
//         res.status(200).json(result);
//       } catch (err) {
//         res.status(400).json(err.message);
//       }
//     }
//   });
// });

module.exports = router;
