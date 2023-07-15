const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");

router.get("/signin", userController.signin);
router.post("/signin", userValidator.signin, userController.signin);

router.get("/signup", userController.signup);
router.post("/signup", userValidator.signup, userController.signup);

router.get("/signout", userController.signout);

module.exports = router;