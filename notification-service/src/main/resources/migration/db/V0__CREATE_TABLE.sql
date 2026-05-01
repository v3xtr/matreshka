-- Включаем расширение для работы с UUID, если его нет
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS notifications (
                                             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id UUID NOT NULL,
    from_user_id VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                             );

-- Индекс для быстрого поиска уведомлений конкретного пользователя
CREATE INDEX idx_notifications_user_id ON notifications(user_id);