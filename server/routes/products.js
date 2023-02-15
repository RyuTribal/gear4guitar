const router = require('express').Router();
const controller = require('../controllers/products');
const jwtauth = require("../middlewares/jwtauth");

router.post("/search/:query", controller.search);
router.post("/product/:id", controller.product);
router.post("/total_results/:query", controller.total_results);
router.post("/get_category_path/:id", controller.get_category_path);
router.post("/get_categories/:parent_id", controller.get_categories);
router.post("/get_category_brands_colors/:id", controller.get_category_brands_colors)
router.post("/comment/:id", controller.comment);
router.post("/get_variants/:id", controller.get_variants);
router.get("/best_sellers", controller.best_sellers);
router.post("/add_product", jwtauth.jwtauth, controller.addProduct);
router.post("/delete_product", jwtauth.jwtauth, controller.deleteProduct);
router.post("/edit_product", jwtauth.jwtauth, controller.editProduct);
module.exports = router;
