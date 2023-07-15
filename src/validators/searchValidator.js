const { check } = require("express-validator");

exports.input = [
  check('keyward')
    .notEmpty()
    .withMessage('キーワードを入力してください。'),
]