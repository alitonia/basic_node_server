from os import listdir
from os.path import isfile, join

WRITE_ON_INSERT_DATA = True
ENABLE_CATEGORY = True
ENABLE_PRODUCT = True
ENABLE_CUSTOMER = True
ENABLE_REVIEW = True
ENABLE_REVIEW = True
ENABLE_SHIPPING = True

SEED = 1337
CATEGORY_LIMIT = 20
PRODUCT_LIMIT = 1000
CUSTOMER_LIMIT = 20
REVIEW_LIMIT = 3000

insert_file_path = 'fake_data_generator/results/new_data.sql'
category_images_storage_path = 'client/public/gen_images/category'

category_image_paths = [f"gen_images/category/{f}" for f in listdir(category_images_storage_path) if
                        isfile(join(category_images_storage_path, f))]

product_images_storage_path = 'client/public/gen_images/product'
product_image_paths = [f"gen_images/product/{f}" for f in listdir(product_images_storage_path) if
                       isfile(join(product_images_storage_path, f))]

MIN_PRICE_BASE = 0.1
MIN_PRICE_SCALING = 10
MAX_PRICE_SCALING = 5000
MAX_STOCK = 3000
CAP_DISCOUNT_PERCENTAGE = 0.95
STOCK_UPPER_BOUND = 5000
BOUGHT_UPPER_BOUND = 200
RATE_UPPER_BOUND = 5
RATED_NUMBER_UPPER_BOUND = 20000
DISCOUNT_WEEK_VARIANT = 5
DISCOUNT_DAY_VARIANT = 10
DISCOUNT_HOUR_VARIANT = 24
PRODUCT_IMAGES_UPPER_BOUND = 3
