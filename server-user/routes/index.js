const router = require(`express`).Router();
const controller = require("../controllers/index");

router.post(`/register`, controller.register);
router.post(`/login`, controller.login);

module.exports = router;
