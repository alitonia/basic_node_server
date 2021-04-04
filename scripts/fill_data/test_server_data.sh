#!/bin/sh

echo '* test *'
docker exec -it db psql -U user -d db -c "SELECT count(*) FROM products"
echo 'Done'
echo ''
