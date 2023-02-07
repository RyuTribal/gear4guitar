const router = require('express').Router();
const controller = require('../controllers/products');

router.post("/search/:query", controller.search);
router.post("/product/:id", controller.product);
router.post("/comment/:id", controller.comment);
router.post("/get_variants/:id", controller.get_variants);
router.get("/best_sellers", controller.best_sellers);
router.post("/add_product", controller.addProduct);
router.post("/delete_product", controller.deleteProduct);
router.post("/edit_product", controller.editProduct);
module.exports = router;
