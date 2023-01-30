const router = require('express').Router();
const controller = require('../controllers/products');

router.get("/search/:query", controller.search);

module.exports = router;