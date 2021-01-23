#!/bin/sh

if [ "$1" = "create-db" ]; then
    docker exec -it db dropdb --if-exists -U postgres db
    docker exec db createdb -U postgres db
elif [ "$1" = "create-table" ]; then
    docker cp ./create_tables.sql db:/create_tables.sql
    docker exec -it db psql -U postgres -d db -f ./create_tables.sql
elif [ "$1" = "insert-data" ]; then
    docker cp ./insert_data.sql db:/insert_data.sql
    docker exec -it db psql -U postgres -d db -f ./insert_data.sql
elif [ "$1" = "check" ]; then
    docker exec -it db psql -U postgres -d db -c "SELECT * FROM products"
else
    echo "syntax error."
fi