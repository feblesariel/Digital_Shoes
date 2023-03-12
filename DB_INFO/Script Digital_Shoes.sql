CREATE DATABASE digital_shoes;

USE digital_shoes;

CREATE TABLE rol(
id INT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(15) NOT NULL
);

CREATE TABLE usuario(
id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(50) NOT NULL,
contraseña VARCHAR(100) NOT NULL,
nombre VARCHAR(15) NOT NULL,
domicilio VARCHAR(50) NOT NULL,
zipcode VARCHAR(20) NOT NULL,
imagen VARCHAR(100),
rol_id INT(1) NOT NULL DEFAULT 1,
FOREIGN KEY (rol_id) REFERENCES rol (id)
);

CREATE TABLE categoria(
id INT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(10) NOT NULL
);

CREATE TABLE producto(
id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(30) NOT NULL,
precio DOUBLE(8,2) NOT NULL,
descripcion VARCHAR(200) NOT NULL,
imagen VARCHAR(100),
id_categoria INT(1) NOT NULL DEFAULT 1,
FOREIGN KEY (id_categoria) REFERENCES categoria (id)
);

CREATE TABLE stock(
id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
unidades INT(3) NOT NULL,
id_product INT(5) NOT NULL,
FOREIGN KEY (id_product) REFERENCES producto (id)
);

CREATE TABLE orden(
id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_user INT(5) NOT NULL,
id_product INT(5) NOT NULL,
cantidad INT(1) NOT NULL,
precio DOUBLE(8,2) NOT NULL,
FOREIGN KEY (id_user) REFERENCES usuario (id),
FOREIGN KEY (id_product) REFERENCES producto (id)
);

INSERT INTO rol (nombre)VALUES
('usuario'),
('administrador');

INSERT INTO usuario (email, contraseña, nombre, domicilio, zipcode, imagen, rol_id) VALUES
('a@a.com','$2a$10$4YA6escvctsIZx/B.skaeef5aU5tDmeMR/8R57vznUSaSxL9Dkhea','Ariel','Calle 1','1651','default_image.png',2);

INSERT INTO categoria (nombre)VALUES
('calzado');

INSERT INTO producto (nombre, precio, descripcion, imagen) VALUES
('Nike Cortez', 35000 ,'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.' , 'zapatilla-1.png'),
('Nike Blazer', 38000 , 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.' , 'zapatilla-2.png'),
('Nike Waffle', 41000, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.' , 'zapatilla-3.png'),
('Nike Daybreak', 43000, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.' , 'zapatilla-4.png'),
('Nike Challenger', 39000 , 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.' ,'zapatilla-5.png'),
('Nike Air Tailwind', 37000, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.','zapatilla-6.png'),
('Nike Air Force', 45000, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.','zapatilla-7.png'),
('Nike Emperator', 37000, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.','zapatilla-8.png'),
('Nike Pegasus', 45000, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim qui cupiditate autem beatae velit optio at voluptates.','zapatilla-9.png');

INSERT INTO stock (unidades, id_product)VALUES
(10,1),
(10,2),
(10,3),
(10,4),
(10,5),
(10,6),
(10,7),
(10,8),
(10,9);