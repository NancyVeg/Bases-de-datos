-- Database: mande_db

-- DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE Persona(
    cedula INT PRIMARY KEY,
    direccion VARCHAR(20),
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    telefono VARCHAR(14) UNIQUE,
    password VARCHAR(60) CHECK (length(password) > 6)
);

CREATE TABLE Trabajador(
    id_trabajador SERIAL PRIMARY KEY,
    cedula INT,
    CONSTRAINT fk_cedula
        FOREIGN KEY (cedula)
        REFERENCES Persona(cedula),
    ocupado BOOLEAN DEFAULT FALSE,
    estrellas FLOAT DEFAULT 4.0
);

CREATE TABLE Usuario_app(
    id_telefono VARCHAR(14) PRIMARY KEY,
    cedula INT,
    CONSTRAINT fk_cedula
        FOREIGN KEY (cedula)
        REFERENCES Persona(cedula),
    email VARCHAR(60),
    medio_pago VARCHAR(20)
);

CREATE TABLE Labor(
    id_labor SERIAL PRIMARY KEY,
    id_trabajador INT,
    CONSTRAINT fk_id_trabajador
        FOREIGN KEY (id_trabajador)
        REFERENCES Trabajador(id_trabajador),
    precioHora FLOAT,
    nombreLabor VARCHAR(20)  
);

CREATE TABLE Trabajador_labor(
    id_labor INT,
    id_trabajador INT,
    CONSTRAINT fk_id_trabajador
        FOREIGN KEY (id_trabajador)
        REFERENCES Trabajador(id_trabajador),
    CONSTRAINT fk_id_labor
        FOREIGN KEY (id_labor)
        REFERENCES Labor(id_labor),
    PRIMARY KEY (id_labor, id_trabajador)
);

CREATE TABLE Usuario_trabajador(
    id_trabajador INT,
    id_telefono VARCHAR(14),
    CONSTRAINT fk_id_telefono
        FOREIGN KEY (id_telefono)
        REFERENCES Usuario_app(id_telefono),
    CONSTRAINT fk_id_trabajador
        FOREIGN KEY (id_trabajador)
        REFERENCES Trabajador(id_trabajador),
    PRIMARY KEY (id_trabajador, id_telefono)
);

CREATE TABLE Historial_pago(
    idHistorial SERIAL PRIMARY KEY,
    cedula INT,
    CONSTRAINT fk_cedula
        FOREIGN KEY (cedula)
        REFERENCES Persona(cedula),
    fechasPago DATE,
    valorPago FLOAT,
    laborPago VARCHAR(20)
);