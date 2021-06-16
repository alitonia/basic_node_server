from random import randint

from faker import Faker
from faker.providers import lorem, address

from control import SEED, PRODUCT_LIMIT, WRITE_ON_INSERT_DATA, insert_file_path, ORDER_LIMIT, RECEIPT_LIMIT

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

# Category_id start at 1
products_id_collection = [i + 1 for i in range(PRODUCT_LIMIT)]
receipts_id_collection = [i + 1 for i in range(RECEIPT_LIMIT)]
size_options = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXL']


def gen_color():
    str = '#'
    pick_char = '1234567890abcdef'
    for i in range(6):
        str += pick_char[randint(0, len(pick_char) - 1)]
    return str


def gen_orders():
    if len(products_id_collection) > 0:
        data = """
--  Products
INSERT INTO orders(receipt_id, product_id, quantity, color, size)
VALUES 
"""

    for i in range(ORDER_LIMIT):
        product_id = products_id_collection[randint(0, len(products_id_collection) - 1)]
        receipt_id = receipts_id_collection[randint(0, len(receipts_id_collection) - 1)]
        quantity = randint(1, 100)
        color = gen_color()
        size = size_options[randint(0, len(size_options) - 1)]

        new_value = f"({receipt_id}, {product_id}, {quantity}, " \
                    f"'{color}', '{size}')"
        data += new_value

        if i != ORDER_LIMIT - 1:
            data += ','
        data += '\n'
    data = data + """;
    """

    with open('fake_data_generator/results/orders.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('orders ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
