var express = require('express');
var router = express.Router();

const auth_controller = require("../Controllers/auth_controller")



router.post("/login", auth_controller.login_post);

router.post("/signup", auth_controller.signup_post);

router.post("/signout", auth_controller.signout_post)


module.exports = router;
