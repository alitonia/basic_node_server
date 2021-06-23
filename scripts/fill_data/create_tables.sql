Drop TABLE if EXISTS reviews CASCADE;
Drop TABLE if EXISTS payment_methods CASCADE;
Drop TABLE if EXISTS shipping_methods CASCADE;
Drop TABLE if EXISTS orders CASCADE;
Drop TABLE if EXISTS receipts CASCADE;
Drop Table if EXISTS customers CASCADE;
Drop TABLE if EXISTS products CASCADE;
Drop TABLE if EXISTS categories CASCADE;
Drop TABLE if EXISTS admins CASCADE;


-- New tables

create TABLE customers
(
    id         serial PRIMARY key,
    first_name varchar(128),
    last_name  varchar(128),
    email      varchar(128) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[A-Za-z]+$'
) ,
    password_hash   varchar(256) ,
    salt varchar(256) CHECK((password_hash is not null and salt is null) = FALSE),
    gender     varchar(32) CHECK (gender in ('male', 'female', 'other', 'not specified')) DEFAULT 'not specified',
    status     varchar(32) CHECK (status in ('active', 'inactive', 'pending')) DEFAULT 'active',
    created_date TIMESTAMP WITH time zone default current_timestamp
);
CREATE
UNIQUE INDEX on customers(email);


create table admins
(
    id    serial PRIMARY key,
    email varchar(128) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[A-Za-z]+$'
) ,
    name          varchar(128),
    password_hash varchar(256),
    salt          varchar(256) CHECK ((password_hash is not null and salt is null) = FALSE)
);


create table shipping_methods
(
    id          serial PRIMARY key,
    name        varchar(128) not null,
    description text,
    price_type  text CHECK ( price_type in ('flat', 'percent')),
    price       int CHECK (price > 0)
);

create table payment_methods
(
    id                   serial PRIMARY key,
    name                 varchar(128) not NULL,
    description          TEXT,
    price_increase_type  text CHECK ( price_increase_type in ('flat', 'percent')),
    price_decrease_type  text CHECK ( price_decrease_type in ('flat', 'percent')),
    price_increase_value int CHECK (price_increase_value > 0),
    price_decrease_value int check (price_decrease_value > 0)
);


CREATE TABLE categories
(
    id              serial PRIMARY KEY,
    name            varchar(128) NOT NULL,
    description     VARCHAR,
    image_link      VARCHAR,
    parent_category integer,
    foreign key (parent_category) REFERENCES categories (id)
);


CREATE TABLE products
(
    id               serial       NOT NULL PRIMARY KEY,
    name             varchar(128) NOT NULL,
    description      TEXT,
    full_description TEXT,
    price            float        NOT NULL CHECK (price >= 0),
    current_stock    int          NOT NULL CHECK (current_stock >= 0),
    bought           int          NOT NULL CHECK (bought >= 0) DEFAULT 0,
    big_image_link   TEXT,
    image_links      TEXT[],
    category_id      integer      NOT NULL,
    created_date     TIMESTAMP WITH TIME ZONE                  DEFAULT CURRENT_TIMESTAMP,
    available        boolean      NOT NULL                     DEFAULT TRUE,
    rating           NUMERIC                                   DEFAULT 0 CHECK (rating >= 0 and rating <= 5),
    total_rated      integer      NOT NULL                     default 0,
    address          varchar(256),
    color_options    varchar(256),
    size_options     varchar(256),
    other_options    varchar(256),
    CONSTRAINT valid_category_id foreign key (category_id) REFERENCES categories (id) ON DELETE CASCADE
);
create
index on products(category_id);


create table receipts
(
    id                 serial PRIMARY key,
    order_date         TIMESTAMP with time zone DEFAULT CURRENT_TIMESTAMP,
    customer_id        integer NOT NULL,
    status             varchar(60)              DEFAULT 'created' CHECK (status in ('created', 'pending', 'cancelled', 'confirmed', 'delivered')),
    billing_first_name varchar(60),
    billing_last_name  varchar(60),
    company_name       varchar(60),
    email              varchar(128),
    phone_number       varchar(60),
    country            varchar(60),
    address            varchar(180),
    postcode           varchar(60),
    city               varchar(60),
    note               varchar(60),
    payment_method     varchar(60),
    constraint valid_customer_id foreign key (customer_id) REFERENCES customers (id) on delete set NULL
);

create
index on receipts(customer_id);

create table orders
(
    receipt_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity   integer NOT NULL CHECK (quantity > 0),
    color      varchar(256),
    size       varchar(256),
    constraint valid_receipt_id foreign key (receipt_id) REFERENCES receipts (id) on delete set null,
    constraint valid_product_id foreign key (product_id) REFERENCES products (id) on delete set null,
    PRIMARY key (receipt_id, product_id, color, size)
);


create table reviews
(
    customer_id  integer not null,
    product_id   integer not null,
    show         boolean                  DEFAULT true,
    value        TEXT    NOT NULL,
    created_date TIMESTAMP with time zone DEFAULT current_timestamp,
    constraint valid_customer_id foreign key (customer_id) REFERENCES customers (id) on delete set null,
    constraint valid_product_id foreign key (product_id) REFERENCES products (id) on delete set null,
    PRIMARY key (customer_id, product_id)
);
