-- SQLITE3
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email UNIQUE TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, password) VALUES ('admin', 'admin@example.com', 'master');
INSERT INTO users (name, email, password) VALUES ('kanichan', 'kani@example.com', 'kanisugi');

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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO products (name, price, description, product_state, delivery_charge_burden, delivery_method, regional_original_delivery, days_up_to_delivery) VALUES ('ハンバーガー', 2000, 'これはうまい', 1, 1, 1, 1, 1);
INSERT INTO products (name, price, description, product_state, delivery_charge_burden, delivery_method, regional_original_delivery, days_up_to_delivery) VALUES ('フンバーガー', 1000, 'これはおいしくない', 1, 1, 1, 1, 1);

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

DROP TABLE IF EXISTS tags;
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
