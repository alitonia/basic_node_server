# This will override fake_data_generator/results/

from control import ENABLE_CATEGORY, ENABLE_PRODUCT, ENABLE_CUSTOMER, ENABLE_REVIEW, WRITE_ON_INSERT_DATA, \
    insert_file_path, ENABLE_SHIPPING, ENABLE_ADMIN
from gen_admin import gen_admins
from gen_shippings import gen_shippings
from gen_categories import gen_categories
from gen_customers import gen_customers
from gen_products import gen_products
from gen_reviews import gen_reviews

data = """
START TRANSACTION;
DELETE FROM reviews;
DELETE FROM payment_methods;
DELETE FROM shipping_methods;
DELETE FROM orders;
DELETE FROM receipts;
DELETE FROM customers;
DELETE FROM categories;
DELETE FROM products;
DELETE FROM admins;

"""
if WRITE_ON_INSERT_DATA:
    with open(insert_file_path, 'w', encoding='utf-8') as f:
        f.write(data)

if ENABLE_CATEGORY:
    gen_categories()

if ENABLE_PRODUCT:
    gen_products()

if ENABLE_CUSTOMER:
    gen_customers()

if ENABLE_REVIEW:
    gen_reviews()

if ENABLE_SHIPPING:
    gen_shippings()

if ENABLE_ADMIN:
    gen_admins()

data = " COMMIT;"
if WRITE_ON_INSERT_DATA:
    with open(insert_file_path, 'a', encoding='utf-8') as f:
        f.write(data)
