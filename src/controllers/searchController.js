/**
 * 商品の検索を行う
 */

const DatabaseUtils = require("../db/databaseUtils");

/**
 * 検索処理
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.searchPost = (req, res) => {
  const keyward = req.body.search;
  if (keyward === null || keyward === undefined || keyward === '') {
    res.status(400).send({ error: '文字列で送信してください。' });
  }

  DatabaseUtils.allQuery("SELECT * FROM products WHERE name LIKE ?", [`%${keyward}%`])
  .then((rows) => {
    console.log(rows);
    res.status(200).send({ products: rows });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send({ error: err });
  });
}