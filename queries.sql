CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    isbn VARCHAR(20) NOT null UNIQUE,
    intro TEXT NOT NULL,
    notes text NOT NULL,
    rating INTEGER NOT NULL,
    date DATE NOT NULL
);