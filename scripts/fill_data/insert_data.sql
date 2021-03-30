START TRANSACTION;

-- Set sequence
DELETE FROM categories;

INSERT INTO categories
VALUES (1, 'Clothes', 'Good clothes for the winter', NULL, NULL);
COMMIT;