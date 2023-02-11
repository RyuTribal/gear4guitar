const router = require('express').Router();
const controller = require('../controllers/basket');
const jwtauth = require("../middlewares/jwtauth");

router.post("/add/:id", jwtauth.jwtauth, controller.addtobasket);

router.get("/get", jwtauth.jwtauth, controller.getbasket);

router.post("/delete/:id", jwtauth.jwtauth, controller.deletefrombasket);

router.post("/completeorder", controller.completeorder);

module.exports = router;
