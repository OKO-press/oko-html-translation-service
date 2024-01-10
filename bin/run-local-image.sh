#!/bin/sh
# Get the directory where the script is located
script_dir=$(dirname "$0")

# Change to a directory relative to the script's location
cd "$script_dir/../"


container_name="oko-html-translation-service"
image_name="oko-html-translation-service:dev"  # replace with your Docker image name
additional_run_options="-p 6660:3000" # replace with any additional options you need for 'docker run'

# Check if the container exists
if docker ps -a | grep -q "$container_name"; then
    echo "Container $container_name exists, starting it..."
    docker start -a "$container_name"
else
    echo "Container $container_name does not exist, creating and starting a new one..."
    docker run --name "$container_name" $additional_run_options "$image_name"
fi
