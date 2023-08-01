const { validationResult } = require("express-validator");
const DatabaseUtils = require("../db/databaseUtils");

/**
 * 編集画面 修正戻り POST
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.inputPost = (req, res) => {
  if (req.session.errors) {
    delete req.session.errors;
  }
  let inquiriesForm = req.session.inquiriesForm;
  if (!inquiriesForm) {
    inquiriesForm = {
      company: "",
      lastName: "",
      firstName: "",
      email: "",
      inquiryText: ""
    }
  }
  res.render("./inquiries/input.ejs", {
    form: inquiriesForm,
    errors: req.session.errors,
    naviActive: "inquiries",
    title: "お問い合わせ内容の入力"
  });
}

/**
 * 編集画面 初期表示 GET
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.inputGet = (req, res) => {
  let inquiriesForm = req.session.inquiriesForm;
  if (!inquiriesForm) {
    inquiriesForm = {
      company: "",
      lastName: "",
      firstName: "",
      email: "",
      inquiryText: ""
    }
  }
  res.render("./inquiries/input.ejs", {
    form: inquiriesForm,
    errors: req.session.errors,
    naviActive: "inquiries",
    title: "お問い合わせ内容の入力"
  });
}

/**
 * 確認画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.confirm = (req, res) => {
  const inquiriesForm = req.body;
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.inquiriesForm = inquiriesForm;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.status(422).redirect("/inquiries/input");
  }
  req.session.inquiriesForm = inquiriesForm;
  res.render("./inquiries/confirm.ejs", {
    form: inquiriesForm,
    naviActive: "inquiries",
    title: "お問い合わせ内容の確認"
  });
}

/**
 * 登録処理
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.register = async (req, res) => {
  const inquiriesForm = req.session.inquiriesForm;
  const sql = "INSERT INTO inquiries (company, name, email, inquiry_text) VALUES (?, ?, ?, ?)";
  const params = [
    inquiriesForm.company,
    inquiriesForm.lastName + ' ' + inquiriesForm.lastName,
    inquiriesForm.email,
    inquiriesForm.inquiryText
  ];
  await DatabaseUtils.executeQuery(sql, params);
  res.redirect("/inquiries/done");
}

/**
 * 完了画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.done = (req, res) => {
  res.render("./inquiries/done.ejs", {
    naviActive: "inquiries",
    title: "お問い合わせ内容の送信完了"
  });
}