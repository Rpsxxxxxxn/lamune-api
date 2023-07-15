const { check } = require("express-validator");

exports.input = [
  check('company')
    .isLength({ max: 20 })
    .withMessage('会社名は20文字以内で入力してください。'),
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
    .not()
    .isEmpty()
    .withMessage('メールアドレスを入力してください。')
    .isEmail()
    .withMessage('メールアドレスの形式が正しくありません。'),
  check('inquiryText')
    .not()
    .isEmpty()
    .withMessage('お問い合わせ内容を入力してください。')
    .isLength({ max: 200 })
    .withMessage('お問い合わせ内容は200文字以内で入力してください。'),
];