#!/usr/bin/env bash


docker stop sek9_ens_app

yes | docker system prune

#git pull origin main

docker build -t sek9_ens_app . -f Dockerfile

docker run \
  --name sek9_ens_app \
  --network sek9 \
  --ip 172.20.0.5 \
  --hostname sek9_ens_app \
  --dns=8.8.8.8 \
  -v ${PWD}:/app \
  -v /app/node_modules \
  -p 3000:3000 \
  -e CHOKIDAR_USEPOLLING=true \
  -d sek9_ens_app

yes | docker system prune
