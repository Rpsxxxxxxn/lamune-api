const { validationResult } = require("express-validator");
const DatabaseUtils = require("../db/databaseUtils");

/**
 * サインイン画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signinGet = (req, res) => {
  let userForm = req.session.userForm;
  if (!userForm) {
    userForm = {
      email: "",
      password: ""
    }
  }
  req.session.userForm = userForm;
  res.render("./users/signinInput.ejs", {
    form: userForm,
    naviActive: "users",
    title: "ユーザーログイン画面",
    errors: req.session.errors
  });
}

/**
 * サインイン画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signinPost = (req, res) => {
  const userForm = req.body;
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.userForm = userForm;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.render("./users/signinInput.ejs", {
      form: userForm,
      naviActive: "users",
      errors: req.session.errors,
      title: "ログイン"
    });
  }
  req.session.userForm = userForm;
  req.session.token = "token";
  res.redirect("/users/home");
}

/**
 * ユーザー新規登録
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signupInputGet = (req, res) => {
  let userForm = req.session.userForm;
  if (!userForm) {
    userForm = {
      email: "",
      password: ""
    }
  }
  res.render("./users/signupInput.ejs", {
    form: userForm,
    naviActive: "users",
    title: "ユーザー新規登録",
    errors: req.session.errors
  });
}
/**
 * ユーザー新規登録
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signupInputPost = (req, res) => {
  let userForm = req.session.userForm;
  if (!userForm) {
    userForm = {
      email: "",
      password: ""
    }
  }
  res.render("./users/signupInput.ejs", {
    form: userForm,
    naviActive: "users",
    title: "ユーザー新規登録",
    errors: req.session.errors
  });
}

/**
 * ユーザー登録情報確認
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 * @returns 
 */
exports.signupConfirm = (req, res) => {
  const userForm = req.body;
  const result = validationResult(req);
  req.session.userForm = userForm;
  if(!result.isEmpty()) {
    req.session.errors = result.array({ onlyFirstError: true });
    return res.status(422).redirect("/users/signup/input");
  }
  res.render("./users/signupConfirm.ejs", {
    form: userForm,
    naviActive: "users",
    title: "ユーザー登録情報確認"
  });
}

/**
 * ユーザー登録処理
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signupRegister = (req, res) => {
  const userForm = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const params = [userForm.lastName + " " + userForm.firstName, userForm.email, userForm.password];
  DatabaseUtils.executeQuery(sql, params);
  res.redirect("/users/signup/done");
}

/**
 * ユーザー登録完了
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signupDone = (req, res) => {
  res.render("./users/signupDone.ejs", {
    form: userForm,
    naviActive: "users",
    title: "ユーザー登録完了"
  });
}

/**
 * ログアウト画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signout = (req, res) => {
  if (!req.session.token) {
    res.redirect("/users/signin");
  }
  req.session.destroy();
  res.render("./users/signout.ejs",{
    naviActive: "users",
    title: "ログアウト"
  });
}