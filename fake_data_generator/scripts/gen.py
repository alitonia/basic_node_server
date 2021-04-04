## This will override fake_data_generator/results/

from faker import Faker
from faker.providers import lorem, address
from random import randint, random
import datetime

from control import SEED, ENABLE_CATEGORY, CATEGORY_LIMIT, SUB_CATEGORY_CHOSEN_RATE, \
    MAX_SUB_CATEGORIES, category_image_paths, WRITE_ON_INSERT_DATA, insert_file_path, ENABLE_PRODUCT, PRODUCT_LIMIT, \
    MIN_PRICE_BASE, MIN_PRICE_SCALING, STOCK_UPPER_BOUND, BOUGHT_UPPER_BOUND, CAP_DISCOUNT_PERCENTAGE, \
    DISCOUNT_WEEK_VARIANT, DISCOUNT_DAY_VARIANT, DISCOUNT_HOUR_VARIANT, product_image_paths, PRODUCT_IMAGES_UPPER_BOUND, \
    RATE_UPPER_BOUND, RATED_NUMBER_UPPER_BOUND, MAX_PRICE_SCALING

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

# Category generation

if ENABLE_CATEGORY:
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
        new_name = ' '.join(fake.words(nb=randint(1, 3))).capitalize()
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

        new_value = f"('{new_name}'," \
                    f" '{fake.paragraph()}', {random_image_link}, {sub_cat_id})"

        if i != CATEGORY_LIMIT - 1:
            new_value += ","
            new_value += f"\n"
        data += new_value

        categories_id_collection.append(i)

    data = data + """;
    COMMIT;
    """

    with open('fake_data_generator/results/categories.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('done generating categories')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'w', encoding='utf-8') as f:
            f.write(data)

# Category_id start at 1
categories_id_collection = [i + 1 for i in range(CATEGORY_LIMIT)]

if ENABLE_PRODUCT and len(categories_id_collection) > 0:
    data = """
--  Products

START TRANSACTION;

DELETE
FROM products;

ALTER SEQUENCE products_id_seq RESTART;

INSERT INTO products(name, description, full_description, price, current_stock,
                     bought, has_discount, discount_price,
                     discount_start_date, discount_end_date,
                     big_image_link, image_links, category_id,
                      rating, total_rated, address)
VALUES
"""

    for i in range(PRODUCT_LIMIT):
        new_name = ' '.join(fake.words(nb=randint(3, 7))).capitalize()
        description = fake.paragraph()
        full_description = fake.paragraph(nb_sentences=randint(3, 7))
        price = (random() + MIN_PRICE_BASE) * randint(MIN_PRICE_SCALING, MAX_PRICE_SCALING)
        current_stock = randint(0, STOCK_UPPER_BOUND)
        bought = randint(0, BOUGHT_UPPER_BOUND)
        has_discount = True if randint(0, 1) == 0 else False
        discount_price = 'NULL'
        discount_start_date = 'NULL'
        discount_end_date = 'NULL'
        if has_discount:
            discount_price = round(min(max(random(), MIN_PRICE_BASE), CAP_DISCOUNT_PERCENTAGE) * price, 2)
            discount_start_date = datetime.datetime.now()
            discount_end_date = datetime.datetime(discount_start_date.year, discount_start_date.month,
                                                  discount_start_date.day) \
                                + datetime.timedelta(weeks=randint(0, DISCOUNT_WEEK_VARIANT),
                                                     days=randint(0, DISCOUNT_DAY_VARIANT),
                                                     hours=randint(0, DISCOUNT_HOUR_VARIANT)
                                                     )
            discount_start_date = f"'{str(discount_start_date.year).zfill(2)}" \
                                  f"-{str(discount_start_date.month).zfill(2)}-" \
                                  f"{str(discount_start_date.day).zfill(2)} " \
                                  f"{str(discount_start_date.hour).zfill(2)}:" \
                                  f"{str(discount_start_date.minute).zfill(2)}:" \
                                  f"{str(discount_start_date.second).zfill(2)}'"

            discount_end_date = f"'{str(discount_end_date.year).zfill(2)}" \
                                f"-{str(discount_end_date.month).zfill(2)}-" \
                                f"{str(discount_end_date.day).zfill(2)} " \
                                f"{str(discount_end_date.hour).zfill(2)}:" \
                                f"{str(discount_end_date.minute).zfill(2)}:" \
                                f"{str(discount_end_date.second).zfill(2)}'"

        if len(product_image_paths) > 0:
            chosen_index = randint(0, len(product_image_paths) - 1)
            big_image_link = product_image_paths[chosen_index]
            product_image_paths.pop(chosen_index)

        image_links = 'NULL'
        number_of_images = randint(0, PRODUCT_IMAGES_UPPER_BOUND)

        if number_of_images > 0 and len(product_image_paths) > 0:
            image_links = 'ARRAY['
            for j in range(number_of_images):
                if len(product_image_paths) == 0:
                    break
                chosen_index = randint(0, len(product_image_paths) - 1)
                image_links += f"'{product_image_paths[chosen_index]}'"

                product_image_paths.pop(chosen_index)
                if j != number_of_images - 1 and len(product_image_paths) > 0:
                    image_links += ','
                image_links += '\n'
            image_links += ']'

        category_id = categories_id_collection[randint(0, len(categories_id_collection) - 1)]
        created_date = datetime.datetime.now()
        created_date = f"{str(created_date.year).zfill(2)}" \
                       f"-{str(created_date.month).zfill(2)}-" \
                       f"{str(created_date.day).zfill(2)} " \
                       f"{str(created_date.hour).zfill(2)}:" \
                       f"{str(created_date.minute).zfill(2)}:" \
                       f"{str(created_date.second).zfill(2)}"
        available = 'TRUE'
        rating = random() * randint(0, RATE_UPPER_BOUND)
        total_rated = randint(1, RATED_NUMBER_UPPER_BOUND)
        address = f"{fake.address()}"

        new_value = f"('{new_name}', '{description}', '{full_description}', " \
                    f"{price}, {current_stock}, {bought}, " \
                    f"{has_discount}, {discount_price}, " \
                    f"{discount_start_date}, {discount_end_date}, " \
                    f"'{big_image_link}', {image_links}, {category_id}, " \
                    f"{rating}, {total_rated}, '{address}')"
        data += new_value
        if i != PRODUCT_LIMIT - 1:
            data += ','
        data += '\n'
    data = data + """;
    COMMIT;
    """

    with open('fake_data_generator/results/products.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        # print(data)
        print('ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
