from random import randint

from faker import Faker
from faker.providers import lorem, address

from control import CATEGORY_LIMIT, category_image_paths, \
    WRITE_ON_INSERT_DATA, insert_file_path, SEED
from get_random_element import get_random_element

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)


def gen_categories():
    data = """
    --  Categories
    ALTER SEQUENCE categories_id_seq RESTART;
    
    INSERT INTO categories(name, description, image_link, parent_category)
    VALUES
        """

    categories_id_collection = []

    for i in range(CATEGORY_LIMIT):
        new_name = ' '.join(fake.words(nb=randint(1, 2))).capitalize()
        parent_category = 'NULL'
        random_image_link = 'NULL'

        if i > 3 and len(categories_id_collection) > 0:
            parent_category = get_random_element(categories_id_collection)

        if len(category_image_paths) > 0:
            random_image_link = f"'{get_random_element(category_image_paths)}'"

        new_value = f"('{new_name}'," + \
                    f" '{fake.paragraph()}', {random_image_link}, {parent_category})"

        if i != CATEGORY_LIMIT - 1:
            new_value += ","
            new_value += f"\n"
        data += new_value

        categories_id_collection.append(i + 1)

    data = data + ";"

    with open('fake_data_generator/results/categories.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('categories ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
