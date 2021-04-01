## This will override fake_data_generator/results/categories.sql

from faker import Faker
from faker.providers import lorem
from random import randint

from os import listdir
from os.path import isfile, join
import math

SEED = 1337
CATEGORY_LIMIT = 20
MAX_SUB_CATEGORIES = 3
SUB_CATEGORY_CHOSEN_RATE = 1  # >0
category_images_storage_path = '../../client/public/images/category'

category_image_paths = [f"images/category/{f}" for f in listdir(category_images_storage_path) if isfile(join(category_images_storage_path, f))]


PRODUCT_LIMIT = 2000
product_images_storage_path = '../../client/public/images/product'
product_image_paths = [f"images/product/{f}" for f in listdir(product_images_storage_path) if isfile(join(product_images_storage_path, f))]


fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)

# Category generation

data = """
--  Categories

START TRANSACTION;

DELETE
FROM categories;

ALTER SEQUENCE categories_id_seq RESTART;

INSERT INTO categories(name, description, image_link, sub_categories)
VALUES 
"""

categories_id_collection = []

for i in range(CATEGORY_LIMIT):
    new_id = ' '.join(fake.words(nb=randint(1, 3))).capitalize()
    sub_cat_id = 'NULL'
    random_image_link = 'NULL'

    if randint(0, SUB_CATEGORY_CHOSEN_RATE) == 0 and len(categories_id_collection) > 0:
        sub_cat_id = 'ARRAY['
        number_of_sub_cat = min(randint(1, len(categories_id_collection)), MAX_SUB_CATEGORIES)

        for j in range(0, number_of_sub_cat):
            chosen_index = randint(0, len(categories_id_collection) - 1)
            sub_cat_id += f"{categories_id_collection[chosen_index]}"
            categories_id_collection.pop(chosen_index)

            if len(categories_id_collection) == 0:
                break
            if j != number_of_sub_cat - 1:
                sub_cat_id += ', '

        sub_cat_id += ']'

    if len(category_image_paths) > 0:
        random_image_link = f"'{category_image_paths[randint(0, len(category_image_paths) - 1)]}'"

    new_value = f"('{new_id}'," \
                f" '{fake.paragraph()}', {random_image_link}, {sub_cat_id})"

    if i != CATEGORY_LIMIT - 1:
        new_value += ","
        new_value += f"\n"
    data += new_value

    categories_id_collection.append(i)

data = data + """;
COMMIT;
"""

with open('../results/categories.sql', 'w', encoding='utf-8') as f:
    f.write(data)
    print('ok')

# print(image_paths)
