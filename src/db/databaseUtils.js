const sqlite3 = require('sqlite3').verbose();

module.exports = class DatabaseUtils {
    static DATABASE_PATH = './db/lamune.db';

    /**
     * Execute SQL 挿入、更新、削除
     * @param {*} sql 
     * @param {*} params 
     */
    static executeQuery(sql, params) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(DatabaseUtils.DATABASE_PATH);
            db.run(sql, params, (err) => {
                db.close();
                if (err) {
                    reject(err);
                }
                resolve('Success');
            });
        });
    }

    /**
     * Get SQL 1件取得
     * @param {*} sql 
     * @param {*} params 
     */
    static getQuery(sql, params) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(DatabaseUtils.DATABASE_PATH);
            db.get(sql, params, (err, row) => {
                db.close();
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }

    /**
     * All SQL 複数件取得
     * @param {*} sql 
     * @param {*} params 
     */
    static allQuery(sql, params) {
        return new Promise((resolve, reject) => {
            const db = new sqlite3.Database(DatabaseUtils.DATABASE_PATH);
            db.all(sql, params, (err, rows) => {
                db.close();
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}