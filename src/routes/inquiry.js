const express = require('express');
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const inquiryValidator = require("../validators/inquiriesValidator");

/**
 * お問い合わせ入力画面
 */
router.post("/input", inquiryController.inputPost);
router.get("/input", inquiryController.inputGet);

/**
 * お問い合わせ確認画面
 */
router.post("/confirm", inquiryValidator.input, inquiryController.confirm);

/**
 * お問い合わせ登録処理
 */
router.post("/register", inquiryController.register);

/**
 * お問い合わせ完了画面
 */
router.post("/done", inquiryController.done);

module.exports = router;