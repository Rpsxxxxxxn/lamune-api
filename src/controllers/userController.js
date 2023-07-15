const { validationResult } = require("express-validator");

/**
 * サインイン画面
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.signin = (req, res) => {
  const form = req.body;
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.form = form;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.render("./users/signin.ejs", {
      form: form,
      naviActive: "user",
      errors: req.session.errors,
      title: "ログイン"
    });
  }
  req.session.form = form;
  res.render("./users/signin.ejs", {
    form: form,
    naviActive: "user",
    errors: req.session.errors,
    title: "ログイン"
  });
}

/**
 * サインアップ画面
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.signup = (req, res) => {
  const form = req.body;
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.form = form;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.render("./users/signup.ejs", {
      form: form,
      naviActive: "user",
      errors: req.session.errors,
      title: "新規登録"
    });
  }
  req.session.form = form;
  res.render("./users/signup.ejs", {
    form: form,
    naviActive: "user",
    errors: req.session.errors,
    title: "新規登録"
  });
}

/**
 * ログアウト画面
 * @param {*} req 
 * @param {*} res 
 */
exports.signout = (req, res) => {
  res.render("./users/signout.ejs",{
    naviActive: "user",
    title: "ログアウト"
  });
}