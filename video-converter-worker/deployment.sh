#!/bin/bash

set -e

echo "--- Начинаю сборку проекта ---"
./gradlew clean build -x test

echo "--- Сборка и пуш Docker-образа ---"

docker buildx build \
  --platform linux/amd64 \
  --no-cache \
  --pull \
  --progress=plain \
  -t proudsss/video-converter:latest \
  --push .

echo "--- Деплой завершен! ---"