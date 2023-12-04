sudo service docker start

# Wait for Docker service to be ready
until docker info >/dev/null 2>&1; do
    echo "Waiting for Docker to start..."
    sleep 1
done

docker container start edu-platform-psql
docker container start pg-admin
