const router = require('express').Router();
const controller = require('../controllers/products');

router.post("/search/:query", controller.search);
router.post("/product/:id", controller.product);

module.exports = router;
