/**
 * 商品の検索を行う
 */

/**
 * 検索処理
 * @param {*} req リクエストパラメータ
 * @param {*} res レスポンスパラメータ
 */
exports.searchPost = (req, res) => {
  const keyward = req.query.keyward;
  console.log(keyward);

  res.status(200).send({ keyward: keyward });
}