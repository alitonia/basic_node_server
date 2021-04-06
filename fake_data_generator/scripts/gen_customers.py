from faker import Faker
from faker.providers import lorem, address

from control import SEED, CUSTOMER_LIMIT, WRITE_ON_INSERT_DATA, insert_file_path
from get_random_element import get_random_element

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

test_account = ('test_first', 'test_last', 'test@ggg.cc', 'NULL', 'NULL', 'other', 'active')

def gen_customers():
    data = f"""
    --  Customers
    ALTER SEQUENCE customers_id_seq RESTART;
    
    INSERT INTO customers(first_name, last_name, email, password, salt, gender, status)
    VALUES 
    {test_account},
    """
    gender_list = ['male', 'female', 'other']
    status_list = ['active', 'inactive', 'pending']

    for i in range(CUSTOMER_LIMIT):
        name: str = fake.name()
        first_name = ''.join(name.split(' ')[-1:]).rstrip()
        last_name = ''.join(name.split(' ')[:-1]).rstrip()
        email = fake.email()
        password = 'NULL'
        salt = 'NULL'
        gender = get_random_element(gender_list)
        status = get_random_element(status_list)
        data += f"('{first_name}', '{last_name}', '{email}', {password}, {salt}, '{gender}', '{status}')"
        if i != CUSTOMER_LIMIT - 1:
            data += ','
        data += '\n'

    data += """;
        """

    with open('fake_data_generator/results/customers.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('customer ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
