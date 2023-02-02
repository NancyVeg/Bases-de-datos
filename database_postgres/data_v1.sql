\c mande_db

--INSERT INTO  usuario(nombre_usuario, password) VALUES ('trolololol@gmail.com', '1234');
--INSERT INTO  usuario(nombre_usuario, password) VALUES ('azulgrana@gmail.com', 'x123');
--INSERT INTO  usuario(nombre_usuario, password, premium) VALUES ('tyler.durden@gmail.com', 'asdfd', TRUE);

INSERT INTO Persona VALUES(1005965561, 'cra16#15-20','Santiago','Ospitia','3154148727', '12345678');
INSERT INTO Trabajador(cedula, estrellas) VALUES (1005965561, 4.5);
INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 10, 'Profesor');
INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));

INSERT INTO Persona VALUES(1005965156, 'cra15#16-02','Santiago','Trujillo','3154148738', '10987654');
INSERT INTO Usuario_app(id_telefono, cedula, email, medio_pago) VALUES ('3154148738', 1005965156, 'asd@gmail.com', 'Masterdcard');
--INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 10, 'Profesor');
--INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));

INSERT INTO Persona VALUES(1006955156, 'cra40#16-02','Hassen','Ortiz',3214148738, '098765432');
INSERT INTO Usuario_app(id_telefono, cedula, email, medio_pago) VALUES (3214148738, 1006955156, 'das@gmail.com', 'Visa');


INSERT INTO Persona VALUES(1115965561, 'Cl 16#15-20','Marta','Rodriguez','3004148727', 'qwertyuiop');
INSERT INTO Trabajador(cedula, estrellas) VALUES (1115965561, 4.0);
INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 12, 'Mecanico');
INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));

INSERT INTO Persona VALUES(1125965561, 'Cl 23#15-20','Lucía','Martinez','3014148727', 'asdfghjkl');
INSERT INTO Trabajador(cedula, estrellas) VALUES (1125965561, 4.3);
INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 12, 'Programador');
INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));