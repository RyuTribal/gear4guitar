const router = require('express').Router();
const controller = require('../controllers/products');

router.post("/search/:query", controller.search);
router.post("/product/:id", controller.product);
router.post("/comment/:id", controller.comment);
router.get("/best_sellers", controller.best_sellers);
router.get("/delete_product", controller.deleteProduct);
router.get("/add_product", controller.addProduct);
module.exports = router;
