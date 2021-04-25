#!/bin/sh

echo '* Add db user if not exists *'
docker exec db createdb --if-not-exists -U user db
echo 'Done'
echo ''

echo '* Add tables *'
docker cp ./scripts/fill_data/create_tables.sql db:./create_tables.sql
docker exec -it db psql -U user -d db -f ./create_tables.sql
echo 'Done'
echo ''

echo '* Insert data *'
docker cp ./scripts/fill_data/insert_data.sql db:./insert_data.sql
docker exec -it db psql -U user -d db -f ./insert_data.sql
echo 'Done'
echo ''
