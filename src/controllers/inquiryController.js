const { validationResult } = require("express-validator");

/**
 * 編集画面 修正戻り POST
 * @param {*} req 
 * @param {*} res 
 */
exports.inputPost = (req, res) => {
  if (req.session.errors) {
    delete req.session.errors;
  }
  let form = req.session.form;
  if (!form) {
    form = {
      company: "",
      lastName: "",
      firstName: "",
      email: "",
      inquiryText: ""
    }
  }
  res.render("./inquiries/input.ejs", {
    form: form,
    errors: req.session.errors,
    naviActive: "inquiries",
    title: "お問い合わせ内容の入力"
  });
}

/**
 * 編集画面 初期表示 GET
 * @param {*} req 
 * @param {*} res 
 */
exports.inputGet = (req, res) => {
  let form = req.session.form;
  if (!form) {
    form = {
      company: "",
      lastName: "",
      firstName: "",
      email: "",
      inquiryText: ""
    }
  }
  res.render("./inquiries/input.ejs", {
    form: form,
    errors: req.session.errors,
    naviActive: "inquiries",
    title: "お問い合わせ内容の入力"
  });
}

/**
 * 確認画面
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.confirm = (req, res) => {
  const form = req.body;
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.form = form;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.status(422).redirect("/inquiries/input");
  }
  req.session.form = form;
  res.render("./inquiries/confirm.ejs", {
    form: form,
    naviActive: "inquiries",
    title: "お問い合わせ内容の確認"
  });
}

/**
 * 登録処理
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {
  res.redirect("/inquiries/done");
}

/**
 * 完了画面
 * @param {*} req 
 * @param {*} res 
 */
exports.done = (req, res) => {
  delete req.session.form;
  res.render("./inquiries/done.ejs", {
    naviActive: "inquiries",
    title: "お問い合わせ内容の送信完了"
  });
}