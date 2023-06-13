-- Active: 1686558080780@@127.0.0.1@3306@projet_stage
CREATE TABLE professeur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    numero_tel INT,
    metier VARCHAR(50),
    etablissement VARCHAR(100),
    role ENUM('Tuteur', 'Encadrant', 'Tuteur et encadrant') NOT NULL

);

CREATE TABLE eleve (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    numero_tel INT,
    numero_parent INT,
    adresse VARCHAR(200),
    college VARCHAR(100),
    tuteur_id INT,
    FOREIGN KEY (tuteur_id) REFERENCES professeur(id)
);

CREATE TABLE activite (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    nb_realisations INT NOT NULL,
    nb_eleve_max INT NOT NULL,
    l1 VARCHAR(5),
    l2 VARCHAR(5),
    ma1 VARCHAR(5),
    ma2 VARCHAR(5),
    me1 VARCHAR(5),
    me2 VARCHAR(5),
    j1 VARCHAR(5),
    j2 VARCHAR(5),
    v1 VARCHAR(5),
    v2 VARCHAR(5),
    encadrant_id INT,
    Foreign Key (encadrant_id) REFERENCES professeur(id)
);