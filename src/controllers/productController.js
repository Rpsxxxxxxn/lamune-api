/**
 * 出品された商品の参照、編集、削除を行う
 */

const { validationResult } = require("express-validator");
const DatabaseUtils = require("../db/databaseUtils");

/**
 * 編集画面 GET
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.productInputGet = async (req, res) => {
  let productForm = req.session.productForm;
  const displayElement = {
    prefectures: await DatabaseUtils.allQuery("SELECT * FROM prefectures;", []),
    product_statuses: await DatabaseUtils.allQuery("SELECT * FROM product_statuses;", []),
    shipping_burdens: await DatabaseUtils.allQuery("SELECT * FROM shipping_burdens;", []),
    shipping_methods: await DatabaseUtils.allQuery("SELECT * FROM shipping_methods;", []),
    shipping_days: await DatabaseUtils.allQuery("SELECT * FROM shipping_days;", []),
  };
  if (!productForm) {
    productForm = {
      name: "", // 製品名
      price: "", // 価格
      description: "", // 製品の説明
      productState: "", // 製品の状態
      deliveryChargeBurden: "", // 発送負担
      deliveryMethod: "", // 配送方法
      regionalOriginalDelivery: "", // 発送元地域
      daysUpToDelivery: "", // 発送までの日数
      image: [], // 画像
    }
  }

  res.render("./products/input.ejs", {
    productForm: productForm,
    displayElement: displayElement,
    title: "製品入力画面",
    naviActive: "products",
    errors: req.session.errors,
    userData: req.session.userData,
  });
}

/**
 * 編集画面 POST
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.productInputPost = (req, res) => {
  const productForm = req.body;
  // バリデーションチェック
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.productForm = productForm;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.render("./users/signinInput.ejs", {
      productForm: productForm,
      naviActive: "users",
      errors: req.session.errors,
      title: "製品入力画面"
    });
  }
  res.render("./products/input.ejs", {
    productForm: productForm,
    title: "製品入力画面",
    naviActive: "products",
    errors: req.session.errors,
    userData: req.session.userData,
  });
}

/**
 * 確認画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.productInputConfirm = (req, res) => {
  const productForm = req.body;
  console.log(productForm)
  // バリデーションチェック
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.productForm = productForm;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.redirect("/products/input");
  }
  res.render("./products/confirm.ejs", {
    title: "製品確認画面",
    naviActive: "products",
    errors: req.session.errors,
    userData: req.session.userData,
  });
}

/**
 * 登録処理
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.productInputRegister = async (req, res) => {
  const productForm = req.body;
  try {
    await DatabaseUtils.executeQuery("BEGIN TRANSACTION;");
    // 製品データの登録
    let params = [
      productForm.name,
      productForm.price,
      productForm.description,
      productForm.productState,
      productForm.deliveryChargeBurden,
      productForm.deliveryMethod,
      productForm.regionalOriginalDelivery,
      productForm.daysUpToDelivery
    ];
    let sql = "INSERT INTO products (name, price, description, product_state, delivery_charge_burden, delivery_method, regional_original_delivery, days_up_to_delivery) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await DatabaseUtils.executeQuery(sql, params);

    // 製品画像の登録
    const newProduct = await DatabaseUtils.getQuery("select max(rowid) as id from products;");  
    for (const element of productForm.imagePath) {
      params = [
        newProduct.id,
        element
      ]
      sql = "INSERT INTO product_images (product_id, image_path) VALUES (?, ?)";
      await DatabaseUtils.executeQuery(sql, params);
    }
  
    await DatabaseUtils.executeQuery("COMMIT;");
  } catch (err) {
    await DatabaseUtils.executeQuery("ROLLBACK;");
    res.redirect("/products/input");
  }
  res.redirect("/products/done");
}

/**
 * 完了画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.productInputDone = (req, res) => {
  res.render("./products/done.ejs", {
    title: "製品完了画面",
    naviActive: "products",
    errors: req.session.errors,
    userData: req.session.userData,
  });
}