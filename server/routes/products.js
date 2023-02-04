const router = require('express').Router();
const controller = require('../controllers/products');

router.post("/search/:query", controller.search);
router.post("/product/:id", controller.product);
router.post("/comment/:id", controller.comment);

module.exports = router;
