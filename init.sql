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
    VALUES ('admin', 'ca@test.com', 'admin'),
    ('user', 'user@test.com', 'user');

INSERT INTO lists (name, description, user_id)
    VALUES ('Lista de Prueba', 'Esta es  una lista musical de prueba', (select id from users where email = 'ca@test.com')),
    ('Lista con Canciones', 'Lista variadita de canciones en ingles para buen mood', (select id from users where email = 'ca@test.com')),
    ('Clasicos del Rock', 'Esta lista esta vacia', (select id from users where email = 'ca@test.com')),
    ('Tranquilitas', 'Esta lista tambien esta vacia', (select id from users where email = 'user@test.com')),
    ('Cafe y Libros', 'Esta lista esta vacia', (select id from users where email = 'user@test.com'));

INSERT INTO songs (name, artist, album, url, image)
    VALUES ('Don´t start now', 'Dua Lipa', 'Don´t start now', 'https://www.youtube.com/watch?v=oygrmJFKYZY' , 'https://los40es00.epimg.net/los40/imagenes/2019/10/27/musica/1572190174_151457_1572190254_noticia_normal.jpg'),
    ('Dance Monkey', 'Tones and I', 'Dance Monkey', 'https://www.youtube.com/watch?v=q0hyYWKXF0Q' , 'https://lastfm.freetls.fastly.net/i/u/770x0/607de08e7519449bea56ebef37ccecbb.jpg'),
    ('I miss you', 'Blink 182', 'blink-182', 'https://www.youtube.com/watch?v=s1tAYmMjLdY&list=PLPywHf374Yxe9SJxIQgKBenbA2bp79o92' , 'https://upload.wikimedia.org/wikipedia/commons/3/30/Blink-182-colorful-smiley-face-square.jpg'),
    ('Payphone', 'Maroon 5', 'Overexposed Track By Track', 'https://www.youtube.com/watch?v=KRaWnd3LJfs' , 'https://img.discogs.com/Lp7Fhn3KZHZZF3oYM2h-UuzlAcA=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6116693-1411502503-2417.jpeg.jpg'),
    ('The Scientist', 'Coldplay', 'A rush of blood to head', 'https://www.youtube.com/watch?v=RB-RcX5DS5A' , 'http://3.bp.blogspot.com/-bMIu24j5gGQ/VOQKs3opAeI/AAAAAAAAAjc/Y7a6e9BAZwI/s1600/A%2Brush%2Bof%2Bblood%2Bto%2Bthe%2Bhead.jpg');

INSERT INTO listsongs (list_id, song_id)
    VALUES (2, 1),(2, 2),(2, 3),(2, 4),(2, 5), (1, 2);
