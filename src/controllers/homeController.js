const DatabaseUtils = require("../db/databaseUtils");

exports.home = async (req, res) => {
  const sql = "SELECT * FROM products";
  const products = await DatabaseUtils.allQuery(sql, []);
  console.log(products);

  res.render("./homes/home.ejs", {
    naviActive: "home",
    title: "トップページ"
  });
}
