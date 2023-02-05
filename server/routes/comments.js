const router = require('express').Router();
const controller = require('../controllers/comments');
const jwtauth = require("../middlewares/jwtauth");

router.post("/add_comment", controller.addComment);
router.post("/add_comment_secure/:id", jwtauth.jwtauth, controller.addCommentSecure);

module.exports = router;