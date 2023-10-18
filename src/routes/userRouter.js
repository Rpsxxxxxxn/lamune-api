const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");

router.get("/signin", userController.signinGet);
router.post("/signin", userValidator.signin, userController.signinPost);
router.post("/signup/input", userController.signupInputPost);
router.get("/signup/input", userController.signupInputGet);
router.post("/signup/confirm", userValidator.signup, userController.signupConfirm);
router.post("/signup/register", userValidator.signup, userController.signupRegister);
router.get("/signup/done", userController.signupDone);
router.get("/signout", userController.signout);

module.exports = router;