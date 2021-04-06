from control import WRITE_ON_INSERT_DATA, insert_file_path


def gen_shippings():
    data = """
    --  Shippings
    ALTER SEQUENCE shipping_methods_id_seq RESTART;

    INSERT INTO shipping_methods(name, description, price_type, price)
    VALUES
    """

    rules = [
        ['normal', 'ship your order through post office', 'flat', 10],
        ['fast', 'ship with higher priority', 'percent', 5],
        ['extra-fast', 'ship with top priority', 'percent', 15],
        ['exclusive', 'personally customized delivery', 'percent', 35]
    ]

    for i, shipping in enumerate(rules):
        name, des, price_type, value = shipping
        data += f"('{name}', '{des}', '{price_type}', {value})"
        if i != len(rules) - 1:
            data += ','
        data += '\n'

    data += """;
        """

    with open('fake_data_generator/results/shippings.sql', 'w', encoding='utf-8') as f:
        f.write(data)
        print('shipping ok')

    if WRITE_ON_INSERT_DATA:
        with open(insert_file_path, 'a', encoding='utf-8') as f:
            f.write(data)
