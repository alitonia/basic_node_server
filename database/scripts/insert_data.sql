START TRANSACTION;

-- Set sequence
DELETE FROM products;

INSERT INTO products
(id, name)
VALUES
(1, 'Iphone X 64G'),
(2, 'Iphone 8 plus 64G'),
(3, 'Samsung Galaxy Note 9 128GB');

COMMIT;