from faker import Faker
from faker.providers import lorem, address

from control import SEED, CUSTOMER_LIMIT, WRITE_ON_INSERT_DATA, insert_file_path, \
    REVIEW_LIMIT, PRODUCT_LIMIT
from get_random_element import get_random_element
from get_random_timestamp import get_random_timestamp

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

customer_id_list = [i + 1 for i in range(CUSTOMER_LIMIT)]
product_id_list = [i + 1 for i in range(PRODUCT_LIMIT)]

checked = dict()


def gen_reviews():
    data = """
    --  Reviews
    INSERT INTO reviews(customer_id, product_id, value, created_date)
    VALUES
    """

    for i in range(REVIEW_LIMIT):
        customer_id = get_random_element(customer_id_list)
        product_id = get_random_element(product_id_list)

        if checked.get(customer_id) and product_id in checked.get(customer_id):
            continue

        if not checked.get(customer_id):
            checked[customer_id] = [product_id]
        else:
            checked[customer_id].append(product_id)

        value = fake.paragraph()
        created_date = get_random_timestamp()

        data += f"({customer_id}, {product_id}, '{value}', '{created_date}')"
        data += ','
        data += '\n'

    data = data[:-2]
    data += """;
        """

    with open('fake_data_generator/results/reviews.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('reviews ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
