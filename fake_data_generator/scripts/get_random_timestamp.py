from random import randint


# create valid postgres timestamp string
def get_random_timestamp() -> str:
    return f"{str(randint(1990, 2030))}" \
           f"-{str(randint(1, 12)).zfill(2)}-" \
           f"{str(randint(1, 28)).zfill(2)} " \
           f"{str(randint(1, 23)).zfill(2)}:" \
           f"{str(randint(0, 59)).zfill(2)}:" \
           f"{str(randint(0, 59)).zfill(2)}"
