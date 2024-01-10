#!/bin/sh

echo "This will build a Docker image."
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line

# Get the directory where the script is located
script_dir=$(dirname "$0")

# Change to a directory relative to the script's location
cd "$script_dir/../"


docker build -t oko-html-translation-service:dev .
