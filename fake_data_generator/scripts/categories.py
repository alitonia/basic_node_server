## This will override fake_data_generator/results/categories.sql


LIMIT = 20
SEED = 1337

from faker import Faker
from faker.providers import lorem
from random import randint

fake = Faker()
Faker.seed(SEED)
fake.add_provider(lorem)

data = """
START TRANSACTION;

DELETE
FROM categories;

INSERT INTO categories(name, description, image_link, sub_categories)
VALUES 
('Clothes', 'Good clothes for the winter', NULL, NULL),

"""

for _ in range(LIMIT):
    new_value = f"('{''.join(fake.words(nb=randint(1, 3)))}'," \
                f" '{fake.paragraph()}', NULL, NULL),"
    data += new_value

data = data + """
; COMMIT;
"""

with open('../results/categories.sql', 'w', encoding='utf-8') as f:
    f.write(data)
    print('hello')
