from random import randint

from faker import Faker
from faker.providers import lorem, address

from control import SEED, PRODUCT_LIMIT, \
    WRITE_ON_INSERT_DATA, insert_file_path, CUSTOMER_LIMIT, RECEIPT_LIMIT

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

# Category_id start at 1
products_id_collection = [i + 1 for i in range(PRODUCT_LIMIT)]
customers_id_collection = [i + 1 for i in range(CUSTOMER_LIMIT)]
size_options = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXL']
status_options = ['pending', 'cancelled', 'confirmed', 'delivered']
payment_options = ['paypal', 'bank']


def gen_color():
    str = '#'
    pick_char = '1234567890abcdef'
    for i in range(6):
        str += pick_char[randint(0, len(pick_char) - 1)]
    return str


def gen_receipts():
    if len(products_id_collection) > 0:
        data = """
--  Products
ALTER SEQUENCE receipts_id_seq RESTART;

INSERT INTO receipts(customer_id, status, billing_first_name, billing_last_name, company_name, email, phone_number, country,
address, postcode, city, note, payment_method)
VALUES 
"""
    for i in range(RECEIPT_LIMIT):
        customer_id = customers_id_collection[randint(0, len(customers_id_collection) - 1)]
        status = status_options[randint(0, len(status_options) - 1)]
        billing_first_name = fake.first_name()
        billing_last_name = fake.last_name()
        company_name = fake.company()
        email = fake.email()
        phone_number = fake.country_calling_code()
        country = ' '.join(fake.words(nb=randint(1, 3))).capitalize()[:50]
        address = fake.address()[:20]
        postcode = fake.postcode()
        city = fake.city()
        note = ' '.join(fake.words(nb=randint(0, 5))).capitalize()[:50]
        payment_method = payment_options[randint(0, len(payment_options) - 1)]

        new_value = f"({customer_id}, '{status}', '{billing_first_name}', " \
                    f"'{billing_last_name}', '{company_name}','{email}','{phone_number}','{country}'," \
                    f"'{address}','{postcode}','{city}','{note}','{payment_method}')"
        data += new_value

        if i != RECEIPT_LIMIT - 1:
            data += ','
        data += '\n'

    data = data + """;
    """

    with open('fake_data_generator/results/receipts.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('receipts ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
