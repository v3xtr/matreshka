#!/bin/bash

# Список всех микросервисов для перезапуска
SERVICES=(
    "auth-service"
    "profile-service"
    "products-service"
    "notifications-service"
    "chat-service"
    "media-service"
    "feed-service"
    "video-converter"
)

echo "🔄 Запуск перезагрузки деплойментов в K3s..."

for service in "${SERVICES[@]}"; do
    echo "Перезапуск деплоймента: $service..."
    sudo k3s kubectl rollout restart deployment/"$service"
done

echo "✅ Все деплойменты отправлены на перезапуск!"