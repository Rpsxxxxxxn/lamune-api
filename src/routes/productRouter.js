const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const productValidator = require('../validators/productValidator');

router.get("/input", productController.productInputGet);
router.post("/input", productValidator.input, productController.productInputPost);

router.post("/confirm", productValidator.input, productController.productInputConfirm);
router.post("/register", productController.productInputRegister);
router.get("/done", productController.productInputDone);

module.exports = router;