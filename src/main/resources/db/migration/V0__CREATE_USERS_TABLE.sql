CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    phone VARCHAR(255),
    name VARCHAR(255),
    city VARCHAR(255),
    description VARCHAR(255),
    address VARCHAR(255),
    avatar_url VARCHAR(255),
    role VARCHAR(50),
    rating DOUBLE PRECISION DEFAULT 5.0,
    ratings_count INTEGER DEFAULT 0
    );