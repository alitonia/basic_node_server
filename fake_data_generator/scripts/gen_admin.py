from faker import Faker
from faker.providers import lorem, address

from control import WRITE_ON_INSERT_DATA, insert_file_path, SEED
import bcrypt

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)
fake.add_provider(address)

test_salt = bcrypt.gensalt()
test_password = bcrypt.hashpw('123456'.encode('utf-8'), test_salt).decode("utf-8")


def gen_admins():
    data = f"""
    --  Admins
    ALTER SEQUENCE admins_id_seq RESTART;
    
    INSERT INTO admins(email,  name, password_hash, salt)
    VALUES ('admin1@clt.io', 'admin1', '{test_password}', '{test_salt.decode("utf-8")}'),
           ('admin2@clt.io', 'admin2', '{test_password}', '{test_salt.decode("utf-8")}'),
           ('admin3@clt.io', 'admin3', '{test_password}', '{test_salt.decode("utf-8")}'),      
           ('admin4@clt.io', 'admin4', '{test_password}', '{test_salt.decode("utf-8")}')

        """

    data = data + ";"

    with open('fake_data_generator/results/admins.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('admins ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
