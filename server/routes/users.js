const router = require("express").Router();
const controller = require("../controllers/users");
const jwtauth = require("../middlewares/jwtauth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/is_logged_in", jwtauth.jwtauth, controller.is_logged_in);
router.get("/get_user", jwtauth.jwtauth, controller.get_user);
router.post("/edit_creds", jwtauth.jwtauth, controller.edit_creds);
router.post("/save_data", jwtauth.jwtauth, controller.save_user_data);
router.get("/get_orders", jwtauth.jwtauth, controller.get_orders);
router.get("/get_order/:id", jwtauth.jwtauth, controller.get_order);
router.get("/get_status", jwtauth.jwtauth, controller.get_status);
router.post("/update_order/:id", jwtauth.jwtauth, controller.update_order);

module.exports = router;
