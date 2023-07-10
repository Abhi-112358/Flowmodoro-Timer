var express = require('express');
var router = express.Router();


const user_data_controller = require("../Controllers/user_data_controller");



router.post("/add-session", user_data_controller.add_session);

router.get("/get-sessions", user_data_controller.get_sessions);

//router.post("/signup", auth_controller.signup_post)


module.exports = router;