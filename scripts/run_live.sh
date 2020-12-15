declare -a commandArray=("yarn" "node")

PORT=8080

for val in "${commandArray[@]}"; do
  if ! command -v "$val" &>/dev/null; then
    echo "Dependency $val could not be found"
    exit
  fi
done
echo 'CLI Dependency: OK'

if ! yarn install; then
  echo "Error installing node_modules for server"
  exit
fi
echo 'Server Dependency: OK'

cd page || (
  echo "page directory doesn't exist. Please check your configuration"
  exit
)

if ! yarn install; then
  echo "Error installing node_modules for page"
  exit
fi
echo 'Page Dependency: OK'

if ! yarn build; then
  echo "Error building page"
  exit
fi
echo 'Page Build: OK'

cd ..

if [[ $* == *--open* || $* == *-o* ]]; then
  if [[ "$OSTYPE" == "linux-gnu" || "$OSTYPE" == "freebsd"* || "$OSTYPE" == "cygwin" ]]; then
    xdg-open "http://localhost:$PORT"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    open "http://localhost:$PORT"
  elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win"* ]]; then
    start "http://localhost:$PORT"
  else
    echo Server opened at port $PORT
  fi
else
  echo Server opened at port $PORT
fi

if [[ $* == *--dev* || $* == *-d* ]]; then
  echo "Starting dev server"
  yarn start:dev
else
  echo "Starting live server"
  yarn start
fi

echo "Done"
