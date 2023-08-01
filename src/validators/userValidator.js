const { check } = require("express-validator");

exports.signup = [
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('氏名を入力してください。')
    .isLength({ max: 20 })
    .withMessage('氏名は20文字以内で入力してください。'),
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('名前を入力してください。')
    .isLength({ max: 20 })
    .withMessage('名前は20文字以内で入力してください。'),
  check('email')
    .notEmpty()
    .withMessage('メールアドレスを入力してください。')
    .isEmail()
    .withMessage('メールアドレスの形式が正しくありません。'),
  check('password')
    .notEmpty()
    .withMessage('パスワードを入力してください。')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上で入力してください。'),
  check('passwordConfirm')
    .notEmpty()
    .withMessage('パスワード（確認）を入力してください。')
    .custom((value, {req}) => value === req.body.password)
    .withMessage("パスワードとパスワード（確認）が一致しません。"),
]

exports.signin = [
  check('email')
    .notEmpty()
    .withMessage('メールアドレスを入力してください。')
    .isEmail()
    .withMessage('メールアドレスの形式が正しくありません。'),
  check('password')
    .notEmpty()
    .withMessage('パスワードを入力してください。')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上で入力してください。'),
]