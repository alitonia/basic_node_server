echo "Generating new data..."
python fake_data_generator/scripts/gen.py
echo "done"

echo "inserting new data"
chmod u+x scripts/fill_data/initialize_database.sh
./scripts/fill_data/initialize_database.sh
echo ""
