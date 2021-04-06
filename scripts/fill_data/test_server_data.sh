#!/bin/sh

echo '* test *'
docker exec -it db psql -U user -d db -c "SELECT * FROM shipping_methods"
echo 'Done'
echo ''
