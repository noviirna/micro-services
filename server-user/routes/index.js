const router = require(`express`).Router();
const controller = require("../controllers/index");
const { authentication, authorization } = require("../middlewares/auth");

router.post(`/register`, controller.register);
router.post(`/login`, controller.login);

router.use(authentication);

router.get("/favorites", controller.getfavorite);

router.get("/favorites/movies", controller.getfavoritemovie);
router.post(
  "/favorites/movies/:id",
  authorization,
  controller.addfavoritemovie
);
router.delete(
  "/favorites/movies/:id",
  authorization,
  controller.removefavoritemovie
);

router.get("/favorites/series", controller.getfavoriteseries);
router.post(
  "/favorites/series/:id",
  authorization,
  controller.addfavoriteseries
);
router.delete(
  "/favorites/series/:id",
  authorization,
  controller.removefavoriteseries
);

module.exports = router;
