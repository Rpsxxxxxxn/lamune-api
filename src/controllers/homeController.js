exports.home = (req, res) => {
  res.render("./homes/home.ejs", {
    naviActive: "home",
    title: "トップページ"
  });
}
