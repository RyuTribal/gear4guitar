const router = require('express').Router();
const controller = require('../controllers/products');

router.post("/search/:query", controller.search);

module.exports = router;
