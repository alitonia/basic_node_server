from os import listdir
from os.path import isfile, join

WRITE_ON_INSERT_DATA = True
ENABLE_CATEGORY = True
ENABLE_PRODUCT = True

SEED = 1337
CATEGORY_LIMIT = 20
PRODUCT_LIMIT = 1000

insert_file_path = 'scripts/fill_data/insert_data.sql'
MAX_SUB_CATEGORIES = 3
SUB_CATEGORY_CHOSEN_RATE = 1  # >0
category_images_storage_path = 'client/public/images/category'

category_image_paths = [f"images/category/{f}" for f in listdir(category_images_storage_path) if
                        isfile(join(category_images_storage_path, f))]

product_images_storage_path = 'client/public/images/product'
product_image_paths = [f"images/product/{f}" for f in listdir(product_images_storage_path) if
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
