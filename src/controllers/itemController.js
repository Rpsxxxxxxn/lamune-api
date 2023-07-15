/**
 * 出品された商品の参照、編集、削除を行う
 */

exports.itemGet = (req, res) => {
  res.render("./items/item.ejs", {
    naviActive: "item"
  });
}

exports.itemPost = (req, res) => {
  res.render("./items/item.ejs", {
    naviActive: "item"
  });
}
