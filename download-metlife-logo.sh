#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/blog/logo

# Download MetLife logo from a public source
curl -o public/images/blog/logo/metlife-logo.png https://upload.wikimedia.org/wikipedia/commons/c/c8/MetLife_logo.png

echo "MetLife logo downloaded successfully to public/images/blog/logo/metlife-logo.png" 