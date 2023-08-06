-- SQLITE3
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(email)
);
INSERT INTO users (name, email, password) VALUES ('管理 者', 'admin@example.com', '$2b$10$tooJWLR1CGpcTtzWRFImlO3L9opl3m53oV8vLqEyW4ydU7fbC/pBS');

DROP TABLE IF EXISTS inquiries;
CREATE TABLE inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT DEFAULT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    inquiry_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS products;
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT NOT NULL,
    product_state INTEGER NOT NULL,
    delivery_charge_burden INTEGER NOT NULL,
    delivery_method INTEGER NOT NULL,
    regional_original_delivery INTEGER NOT NULL,
    days_up_to_delivery INTEGER NOT NULL,
    prefecture INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products (name, price, description, product_state, delivery_charge_burden, delivery_method, regional_original_delivery, days_up_to_delivery, prefecture) VALUES ('ハンバーガー', 2000, 'これはうまい', 1, 1, 1, 1, 1, 1);
INSERT INTO products (name, price, description, product_state, delivery_charge_burden, delivery_method, regional_original_delivery, days_up_to_delivery, prefecture) VALUES ('ハンバーガー', 2000, 'これはどうやろ', 1, 1, 1, 1, 1, 1);

DROP TABLE IF EXISTS products_images;
CREATE TABLE products_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image_path TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products_images (product_id, image_path) VALUES (1, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg');
INSERT INTO products_images (product_id, image_path) VALUES (2, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg');
INSERT INTO products_images (product_id, image_path) VALUES (2, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg');

DROP TABLE IF EXISTS products_goods;
CREATE TABLE products_goods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products_goods (product_id, user_id) VALUES (1, 1);

DROP TABLE IF EXISTS products_tags;
CREATE TABLE products_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products_tags (tag_name) VALUES ('ハンバーガー');
INSERT INTO products_tags (tag_name) VALUES ('ハンバーガーおいしい');
INSERT INTO products_tags (tag_name) VALUES ('ハンバーガー');
INSERT INTO products_tags (tag_name) VALUES ('ハンバーガーまずい');
INSERT INTO products_tags (tag_name) VALUES ('ハンバーガーなえた');

DROP TABLE IF EXISTS shopping_carts;
CREATE TABLE shopping_carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 都道府県コード
DROP TABLE IF EXISTS prefectures;
CREATE TABLE prefectures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prefecture_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO prefectures (prefecture_name) VALUES ('北海道');
INSERT INTO prefectures (prefecture_name) VALUES ('青森県');
INSERT INTO prefectures (prefecture_name) VALUES ('岩手県');
INSERT INTO prefectures (prefecture_name) VALUES ('宮城県');
INSERT INTO prefectures (prefecture_name) VALUES ('秋田県');
INSERT INTO prefectures (prefecture_name) VALUES ('山形県');
INSERT INTO prefectures (prefecture_name) VALUES ('福島県');
INSERT INTO prefectures (prefecture_name) VALUES ('茨城県');
INSERT INTO prefectures (prefecture_name) VALUES ('栃木県');
INSERT INTO prefectures (prefecture_name) VALUES ('群馬県');
INSERT INTO prefectures (prefecture_name) VALUES ('埼玉県');
INSERT INTO prefectures (prefecture_name) VALUES ('千葉県');
INSERT INTO prefectures (prefecture_name) VALUES ('東京都');
INSERT INTO prefectures (prefecture_name) VALUES ('神奈川県');
INSERT INTO prefectures (prefecture_name) VALUES ('新潟県');
INSERT INTO prefectures (prefecture_name) VALUES ('富山県');
INSERT INTO prefectures (prefecture_name) VALUES ('石川県');
INSERT INTO prefectures (prefecture_name) VALUES ('福井県');
INSERT INTO prefectures (prefecture_name) VALUES ('山梨県');
INSERT INTO prefectures (prefecture_name) VALUES ('長野県');
INSERT INTO prefectures (prefecture_name) VALUES ('岐阜県');
INSERT INTO prefectures (prefecture_name) VALUES ('静岡県');
INSERT INTO prefectures (prefecture_name) VALUES ('愛知県');
INSERT INTO prefectures (prefecture_name) VALUES ('三重県');
INSERT INTO prefectures (prefecture_name) VALUES ('滋賀県');
INSERT INTO prefectures (prefecture_name) VALUES ('京都府');
INSERT INTO prefectures (prefecture_name) VALUES ('大阪府');
INSERT INTO prefectures (prefecture_name) VALUES ('兵庫県');
INSERT INTO prefectures (prefecture_name) VALUES ('奈良県');
INSERT INTO prefectures (prefecture_name) VALUES ('和歌山県');
INSERT INTO prefectures (prefecture_name) VALUES ('鳥取県');
INSERT INTO prefectures (prefecture_name) VALUES ('島根県');
INSERT INTO prefectures (prefecture_name) VALUES ('岡山県');
INSERT INTO prefectures (prefecture_name) VALUES ('広島県');
INSERT INTO prefectures (prefecture_name) VALUES ('山口県');
INSERT INTO prefectures (prefecture_name) VALUES ('徳島県');
INSERT INTO prefectures (prefecture_name) VALUES ('香川県');
INSERT INTO prefectures (prefecture_name) VALUES ('愛媛県');
INSERT INTO prefectures (prefecture_name) VALUES ('高知県');
INSERT INTO prefectures (prefecture_name) VALUES ('福岡県');
INSERT INTO prefectures (prefecture_name) VALUES ('佐賀県');
INSERT INTO prefectures (prefecture_name) VALUES ('長崎県');
INSERT INTO prefectures (prefecture_name) VALUES ('熊本県');
INSERT INTO prefectures (prefecture_name) VALUES ('大分県');
INSERT INTO prefectures (prefecture_name) VALUES ('宮崎県');
INSERT INTO prefectures (prefecture_name) VALUES ('鹿児島県');
INSERT INTO prefectures (prefecture_name) VALUES ('沖縄県');

-- 製品の状態
DROP TABLE IF EXISTS product_statuses;
CREATE TABLE product_statuses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_status_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO product_statuses (product_status_name) VALUES ('新品、未使用');
INSERT INTO product_statuses (product_status_name) VALUES ('未使用に近い');
INSERT INTO product_statuses (product_status_name) VALUES ('目立った傷や汚れなし');
INSERT INTO product_statuses (product_status_name) VALUES ('やや傷や汚れあり');
INSERT INTO product_statuses (product_status_name) VALUES ('傷や汚れあり');
INSERT INTO product_statuses (product_status_name) VALUES ('全体的に状態が悪い');

-- 発送負担
DROP TABLE IF EXISTS shipping_burdens;
CREATE TABLE shipping_burdens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipping_burden_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO shipping_burdens (shipping_burden_name) VALUES ('送料込み（出品者負担）');
INSERT INTO shipping_burdens (shipping_burden_name) VALUES ('着払い（購入者負担）');

-- 配送方法
DROP TABLE IF EXISTS shipping_methods;
CREATE TABLE shipping_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipping_method_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO shipping_methods (shipping_method_name) VALUES ('未定');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('らくらくメルカリ便');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('ゆうメール');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('レターパック');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('普通郵便（定形、定形外）');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('クロネコヤマト');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('ゆうパック');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('クリックポスト');
INSERT INTO shipping_methods (shipping_method_name) VALUES ('ゆうパケット');

-- 発送までの日数
DROP TABLE IF EXISTS shipping_days;
CREATE TABLE shipping_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipping_day_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO shipping_days (shipping_day_name) VALUES ('1~2日で発送');
INSERT INTO shipping_days (shipping_day_name) VALUES ('2~3日で発送');
INSERT INTO shipping_days (shipping_day_name) VALUES ('4~7日で発送');