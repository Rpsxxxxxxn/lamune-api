const DatabaseUtils = require('../../src/db/databaseUtils');

describe('データベースユーティリティ', () => {
  test('クエリ実行', async () => {
    const sql = "SELECT * FROM products";
    const products = await DatabaseUtils.allQuery(sql, []);
    expect(products).not.toBeNull();
  });

  test('クエリ取得', async () => {
    const sql = "SELECT * FROM products WHERE id = ?";
    const product = await DatabaseUtils.getQuery(sql, [1]);
    expect(product).not.toBeNull();
  });

  test('クエリ取得（存在しないID）', async () => {
    const sql = "SELECT * FROM products WHERE id = ?";
    const product = await DatabaseUtils.getQuery(sql, [999]);
    expect(product).toBeUndefined();
  });
});
