/**
 * 出品された商品の参照、編集、削除を行う
 */

exports.productInputGet = (req, res) => {
  res.render("./products/input.ejs", {
    naviActive: "products"
  });
}

exports.productInputPost = (req, res) => {
  res.render("./products/input.ejs", {
    naviActive: "products"
  });
}

exports.productInputConfirm = (req, res) => {
  res.render("./products/confirm.ejs", {
    naviActive: "products"
  });
}

exports.productInputRegister = (req, res) => {
  res.redirect("/products/done");
}

exports.productInputDone = (req, res) => {
  res.render("./products/done.ejs", {
    naviActive: "products"
  });
}