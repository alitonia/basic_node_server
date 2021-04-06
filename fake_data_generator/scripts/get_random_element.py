from random import randint


# get random element from a list
def get_random_element(x: list):
    if len(x) == 0:
        return None
    else:
        return x[randint(0, len(x) - 1)]
