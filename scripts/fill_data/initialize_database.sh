#!/bin/sh

docker exec -it db dropdb --if-exists -U user db
docker exec db createdb -U user db
docker cp ./scripts/fill_data/create_tables.sql db:./create_tables.sql
docker exec -it db psql -U user -d db -f ./create_tables.sql
docker cp ./scripts/fill_data/insert_data.sql db:./insert_data.sql
docker exec -it db psql -U user -d db -f ./insert_data.sql
