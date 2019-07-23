const router = require(`express`).Router();
const controller = require("../controllers/index");

router.post(`/register`, controller.register);
router.post(`/login`, controller.login);
router.post("/favorites/movies/:id", controller.addfavoritemovie);
router.delete("/favorites/movies/:id", controller.removefavoritemovie);
router.post("/favorites/tv/:id", controller.addfavoriteseries);
router.delete("/favorites/tv/:id", controller.removefavoriteseries);

module.exports = router;
