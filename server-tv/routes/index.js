const router = require(`express`).Router();
const controller = require("../controllers/index");
const { authentication, authorization } = require("../middlewares/auth");

router.get(`/`, controller.all); // get all data
router.get(`/:id`, controller.detail); // get detail

router.use(authentication); // check token & get req.user
router.get(`/user`, controller.user); // get user own data
router.post(`/`, controller.create); // create
router.patch(`/:id`, authorization, controller.update); // update
router.delete(`/:id`, authorization, controller.delete); // delete
router.get(`/seeds`, controller.seeds); // seeding mock data

module.exports = router;
