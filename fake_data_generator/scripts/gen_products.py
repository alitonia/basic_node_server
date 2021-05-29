import datetime
from random import randint, random

from faker import Faker
from faker.providers import lorem, address

from control import CATEGORY_LIMIT, SEED, PRODUCT_LIMIT, MIN_PRICE_SCALING, MIN_PRICE_BASE, \
    MAX_PRICE_SCALING, STOCK_UPPER_BOUND, BOUGHT_UPPER_BOUND, DISCOUNT_WEEK_VARIANT, DISCOUNT_DAY_VARIANT, \
    DISCOUNT_HOUR_VARIANT, product_image_paths, PRODUCT_IMAGES_UPPER_BOUND, RATE_UPPER_BOUND, RATED_NUMBER_UPPER_BOUND, \
    WRITE_ON_INSERT_DATA, insert_file_path, CAP_DISCOUNT_PERCENTAGE
from get_random_timestamp import get_random_timestamp
from get_random_element import get_random_element

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

# Category_id start at 1
categories_id_collection = [i + 1 for i in range(CATEGORY_LIMIT)]


def gen_products():
    if len(categories_id_collection) > 0:
        data = """
--  Products
ALTER SEQUENCE products_id_seq RESTART;

INSERT INTO products(name, description, full_description, price, current_stock,
                     bought, big_image_link, image_links, category_id,
                      rating, total_rated, address, created_date)
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
                                + datetime.timedelta(weeks=randint(1, DISCOUNT_WEEK_VARIANT),
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

        category_id = get_random_element(categories_id_collection)
        created_date = get_random_timestamp()
        available = 'TRUE'
        rating = random() * randint(0, RATE_UPPER_BOUND)
        total_rated = randint(1, RATED_NUMBER_UPPER_BOUND)
        address = f"{fake.address()}"

        new_value = f"('{new_name}', '{description}', '{full_description}', " \
                    f"{price}, {current_stock}, {bought}, " \
                    f"'{big_image_link}', {image_links}, {category_id}, " \
                    f"{rating}, {total_rated}, '{address}', '{created_date}')"
        data += new_value
        if i != PRODUCT_LIMIT - 1:
            data += ','
        data += '\n'
    data = data + """;
    """

    with open('fake_data_generator/results/products.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('product ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
