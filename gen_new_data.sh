echo "Generating new data..."
python fake_data_generator/scripts/gen.py
echo "done"

echo "inserting new data"
docker cp fake_data_generator/results/new_data.sql db:./new_data.sql
docker exec -it db psql -U user -d db -f ./new_data.sql
echo 'Done'
echo ''
