const router = require('express').Router();
const controller = require('../controllers/basket');

router.post("/basket/:id", controller.addtobasket);

router.post("/delete", controller.deletefrombasket);

router.post("/completeorder", controller.completeorder);

module.exports = router;
