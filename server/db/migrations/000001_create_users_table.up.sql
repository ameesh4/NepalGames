CREATE Table users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) not null unique,
    age INT,
    password VARCHAR(2000),
    created_on DATE,
    updated_on DATE
)