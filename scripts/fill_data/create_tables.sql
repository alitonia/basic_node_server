Drop TABLE if EXISTS categories;
Drop TABLE if EXISTS products;
Drop TABLE if EXISTS accounts;


CREATE TABLE categories
(
    id             serial PRIMARY KEY,
    name           varchar(128) NOT NULL,
    description    VARCHAR,
    image_link     VARCHAR,
    sub_categories integer[]
);


CREATE TABLE products
(
    id                  serial       NOT NULL PRIMARY KEY,
    name                varchar(128) NOT NULL,
    description         TEXT,
    price               float        NOT NULL CHECK (price >= 0),
    current_stock       int          NOT NULL CHECK (current_stock >= 0),
    bought              int          NOT NULL CHECK (bought >= 0) DEFAULT 0,
    has_discount        boolean      NOT NULL,
    discount_price      float CHECK (has_discount = TRUE OR discount_price = NULL
        ),
    discount_start_date TIMESTAMP,
    discount_end_date   TIMESTAMP CHECK (discount_start_date = NULL OR discount_end_date > discount_start_date
        ),
    big_image_link      TEXT,
    image_links         TEXT[],
    store_id            int          NOT NULL,
    category_id         integer      NOT NULL,
    available_size      TEXT[],
    available_color     TEXT[],
    created_date        TIMESTAMP WITH TIME ZONE                  DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_category_id foreign key (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

