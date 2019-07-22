const router = require(`express`).Router();
const controller = require("../controllers/index");
const { authentication, authorization } = require("../middlewares/auth");

// router.use(authentication); // check token & get req.user

router.get(`/`, controller.all); // get all data
router.get(`/user`, controller.user); // get user own data
router.get(`/seeds`, authentication, controller.seeds);
router.get(`/:id`, controller.detail); // get detail
router.post(`/`, controller.create); // create
router.patch(`/:id`, authorization, controller.update); // update
router.delete(`/:id`, authorization, controller.delete); // delete

module.exports = router;
