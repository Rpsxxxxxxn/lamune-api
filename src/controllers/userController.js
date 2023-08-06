const { validationResult } = require("express-validator");
const DatabaseUtils = require("../db/databaseUtils");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    errors: req.session.errors,
    userData: req.session.userData,
  });
}

/**
 * サインイン画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signinPost = async (req, res) => {
  const userForm = req.body;
  // バリデーションチェック
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.userForm = userForm;
    req.session.errors = result.array({ onlyFirstError: true });
    return res.render("./users/signinInput.ejs", {
      form: userForm,
      naviActive: "users",
      errors: req.session.errors,
      title: "ユーザーログイン画面",
      userData: req.session.userData,
    });
  }
  // ユーザーの存在確認
  const params = [userForm.email];
  const sql = "SELECT * FROM users WHERE email = ?";
  const userData = await DatabaseUtils.getQuery(sql, params);
  if (!userData) {
    req.session.errors = [{
      path: "userNotFound",
      msg: "ユーザーが存在しません。"
    }];
    return res.render("./users/signinInput.ejs", {
      form: userForm,
      naviActive: "users",
      errors: req.session.errors,
      title: "ユーザーログイン画面",
      userData: req.session.userData,
    });
  }

  // パスワードの照合
  const isSuccess = await bcrypt.compare(userForm.password, userData.password);
  if (!isSuccess) {
    req.session.errors = [{
      path: "password",
      msg: "メールアドレスまたはパスワードが間違っています。"
    }];
    return res.render("./users/signinInput.ejs", {
      form: userForm,
      naviActive: "users",
      errors: req.session.errors,
      title: "ユーザーログイン画面",
      userData: req.session.userData,
    });
  }

  req.session.userData = userData;
  res.redirect("/home");
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
    errors: req.session.errors,
    userData: req.session.userData,
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
    errors: req.session.errors,
    userData: req.session.userData,
  });
}

/**
 * ユーザー登録情報確認
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 * @returns 
 */
exports.signupConfirm = async (req, res) => {
  const userForm = req.body;
  req.session.userForm = userForm;
  // バリデーションチェック
  const result = validationResult(req);
  if(!result.isEmpty()) {
    req.session.errors = result.array({ onlyFirstError: true });
    return res.status(422).redirect("/users/signup/input");
  }
  
  // ユーザーの存在確認
  const params = [userForm.email];
  const sql = "SELECT * FROM users WHERE email = ?";
  const userData = await DatabaseUtils.getQuery(sql, params);
  if (userData) {
    req.session.errors = [{
      path: "registeredEmail",
      msg: "既に登録されているメールアドレスです。"
    }];
    return res.status(422).redirect("/users/signup/input");
  }

  res.render("./users/signupConfirm.ejs", {
    form: userForm,
    naviActive: "users",
    title: "ユーザー登録情報確認",
    userData: req.session.userData,
  });
}

/**
 * ユーザー登録処理
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signupRegister = async (req, res) => {
  const userForm = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash(userForm.password, saltRounds);
  const params = [
    userForm.lastName + " " + userForm.firstName,
    userForm.email,
    hashedPassword
  ];
  // ユーザー登録
  await DatabaseUtils.executeQuery(sql, params);
  res.redirect("/users/signup/done");
}

/**
 * ユーザー登録完了
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signupDone = (req, res) => {
  res.render("./users/signupDone.ejs", {
    naviActive: "users",
    title: "ユーザー登録完了",
    userData: req.session.userData,
  });
}

/**
 * ログアウト画面
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.signout = (req, res) => {
  if (!req.session.userData) {
    res.redirect("/users/signin");
  }
  req.session.destroy();
  res.render("./users/signout.ejs",{
    naviActive: "users",
    title: "ログアウト",
    userData: null,
  });
}