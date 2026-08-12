#!/bin/bash

DATABASES="auth_db profile_db products_db feed_db media_db"

CONTAINER_NAME="9ebc38c3758d"
POSTGRES_USER="postgres"

echo "=== Запуск создания баз данных ==="

for db in $DATABASES; do
    echo -n "Проверяем/создаем базу данных: $db ... "

    DB_EXISTS=$(docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$db'")

    if [ "$DB_EXISTS" = "1" ]; then
        echo "уже существует, пропускаем."
    else
        docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER -c "CREATE DATABASE \"$db\";" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            echo "успешно создана!"
        else
            echo "ошибка при создании!"
        fi
    fi
done

echo "=== Готово! ==="