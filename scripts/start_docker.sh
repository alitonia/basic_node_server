PORT=8080

INITIAL_NAME='my_amzing_server/demo'
VERSION='0.0.1'
IMAGE_NAME="${INITIAL_NAME}:${VERSION}"
INSTANCE_NAME='amzing_instance'

if ! command -v docker &>/dev/null; then
  echo "Dependency docker could not be found"
  exit
fi

echo 'Docker: OK'

if docker image ls | grep "$INITIAL_NAME" | awk '{print $2}' | grep "$VERSION" &>/dev/null; then
  echo "IMAGE : OK"
else
  echo "IMAGE $IMAGE_NAME not found. Now building"
  if docker build -t "$IMAGE_NAME" .; then
    echo "IMAGE : OK"
  else
    exit
  fi
fi

output=$(docker ps -a | grep "$IMAGE_NAME" | awk '{print $NF}' | head -n 1 || '' &>/dev/null)
if [ -n "$output" ]; then
  echo "Found Docker Container $output: OK"
  docker start "$output"
else
  echo "Docker Container not found. Creating new one"
  if ! (docker ps -a | awk '{print $NF}' | grep $INSTANCE_NAME >/dev/null); then
    if ! docker run --publish "$PORT":"$PORT" --detach --name "$INSTANCE_NAME" "$IMAGE_NAME"; then
      exit
    else
      echo "Docker Container: OK"
      echo "Server now running at PORT $PORT, on container $INSTANCE_NAME"
    fi
  else
    i=0
    while (docker ps -a | awk '{print $NF}' | grep "${INSTANCE_NAME}_${i}" &>/dev/null); do
      ((i += 1))
    done
    if ! docker run --publish "$PORT":"$PORT" --detach --name "${INSTANCE_NAME}_${i}" "$IMAGE_NAME"; then
      exit
    else
      echo "Docker Container: OK"
      echo "Server now running at PORT $PORT, on container ${INSTANCE_NAME}_${i}"
    fi
  fi
fi

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
