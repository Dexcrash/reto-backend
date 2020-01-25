CREATE DATABASE dbreto;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT,
    password VARCHAR(20)
);

CREATE TABLE lists(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL UNIQUE,
    description TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE songs(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL UNIQUE,
	artist VARCHAR(40),
    album VARCHAR(40),
    url TEXT,
    image TEXT
);

CREATE TABLE listsongs(
    list_id INTEGER,    
    song_id INTEGER,
    FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE CASCADE,
    FOREIGN KEY (song_id) REFERENCES songs (id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password)
    VALUES ('joe', 'joe@ibm.com', '123456'),
    ('ryan', 'ryan@faztweb.com', 'prueba');

INSERT INTO lists (name, description, user_id)
    VALUES ('lista bien mela', 'prueba1', (select id from users where email = 'joe@ibm.com')),
    ('lista interesante', 'prueba2', (select id from users where email = 'joe@ibm.com'));

INSERT INTO songs (name, artist, album, url, image)
    VALUES ('Cancion de prueba', 'ArtistaPrueba', 'AlbumPrueba', 'url de prueba' , 'url de prueba2');    

INSERT INTO listsongs (list_id, song_id)
    VALUES (1, 1);
