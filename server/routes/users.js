const router = require('express').Router();
const controller = require('../controllers/users');
const jwtauth = require("../middlewares/jwtauth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/edit_creds", jwtauth.jwtauth, controller.edit_creds);

module.exports = router;