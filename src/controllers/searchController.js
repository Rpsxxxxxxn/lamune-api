/**
 * 商品の検索を行う
 */

exports.searchPost = (req, res) => {
  const keyward = req.query.keyward;
  

  res.render("./homes/home.ejs", {
    naviActive: "home"
  });
}