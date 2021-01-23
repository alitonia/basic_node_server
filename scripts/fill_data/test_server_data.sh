#!/bin/sh

docker exec -it db psql -U user -d db -c "SELECT * FROM products"
