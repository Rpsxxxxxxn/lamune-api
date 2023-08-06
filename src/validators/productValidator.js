const { check } = require("express-validator");

exports.input = [
  check('name')
    .notEmpty()
    .withMessage('製品名を入力してください。')
    .isLength({ max: 50 })
    .withMessage('製品名は50文字以内で入力してください。'),
  check('price')
    .notEmpty()
    .withMessage('価格を入力してください。')
    .isInt()
    .withMessage('価格は整数で入力してください。'),
  check('description')
    .isLength({ max: 500 })
    .withMessage('製品の説明は500文字以内で入力してください。'),
  check('productState')
    .notEmpty()
    .withMessage('製品の状態を入力してください。'),
  check('deliveryChargeBurden')
    .notEmpty()
    .withMessage('配送料の負担を入力してください。'),
  check('deliveryMethod')
    .notEmpty()
    .withMessage('発送方法を入力してください。'),
  check('regionalOriginalDelivery')
    .notEmpty()
    .withMessage('発送元地域を入力してください。'),
  check('daysUpToDelivery')
    .notEmpty()
    .withMessage('発送までの日数を入力してください。'),
]