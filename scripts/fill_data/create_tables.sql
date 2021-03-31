-- New tables

Drop TABLE if EXISTS categories;
Drop TABLE if EXISTS products;
Drop Table if EXISTS customers;
Drop TABLE if EXISTS receipts;
Drop TABLE if EXISTS orders;
Drop TABLE if EXISTS reviews;
Drop TABLE if EXISTS payment_methods;
Drop TABLE if EXISTS shipping_methods;


create TABLE customers
(
    id         serial PRIMARY key,
    first_name varchar(128),
    last_name  varchar(128),
    email      varchar(128) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[A-Za-z]+$'
) ,
    password   varchar(256) NOt NULL,
    salt varchar(256) NOt null,
    gender     varchar(32) CHECK (gender in ('male', 'female', 'other')),
    status     varchar(32) CHECK (status in ('active', 'inactive', 'pending')),
    created_date TIMESTAMP WITH time zone default current_timestamp
);

create table shipping_methods
(
    id          serial PRIMARY key,
    name        varchar(128) not null,
    description text,
    price_rules TEXT[] DEFAULT Array('*')
);

create table payment_methods
(
    id                   serial PRIMARY key,
    name                 varchar(128) not NULL,
    description          TEXT,
    price_increase_rules text[],
    price_decrease_rules text[]
);


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
    available           boolean      NOT NULL                     DEFAULT TRUE,
    rating              NUMERIC                                   DEFAULT 0 CHECK (rating >= 0 and rating <= 5),
    total_rated         integer      NOT NULL                     default 0,
    CONSTRAINT valid_category_id foreign key (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

create table receipts
(
    id                    serial PRIMARY key,
    order_date            TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    total_unique_products integer NOT NULL CHECK ( total_unique_products > 0),
    customer_id           integer NOT NULL,
    status                varchar(60)              DEFAULT 'pending' CHECK (status in ('pending', 'cancelled', 'delivered')),
    total_price           NUMERIC NOT NULL CHECK (total_price >= 0),
    constraint valid_customer_id foreign key (customer_id) REFERENCES customers (id) on delete set NULL
);

create table orders
(
    receipt_id integer NOT NULL,
    product_id integer NOT NULL,
    constraint valid_receipt_id foreign key (receipt_id) REFERENCES receipts (id) on delete set null,
    constraint valid_product_id foreign key (product_id) REFERENCES products (id) on delete set null,
    quantity   integer NOT NULL CHECK (quantity > 0)
);


create table reviews
(
    customer_id  integer not null,
    product_id   integer not null,
    constraint valid_customer_id foreign key (customer_id) REFERENCES customers (id) on delete set null,
    constraint valid_product_id foreign key (product_id) REFERENCES products (id) on delete set null,
    show         boolean                  DEFAULT true,
    value        TEXT    NOT NULL,
    created_date TIMESTAMP with time zone DEFAULT current_timestamp
);
