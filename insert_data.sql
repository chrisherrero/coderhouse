NSERT INTO Juego (titulo, categoria, autor, anio_publicacion, copias, copias_disponibles)
VALUES 
('Catan', 'Estrategia', 'K. Teuber', 1995, 3, 3),
('Dixit', 'Creatividad', 'J. Bauza', 2008, 2, 2),
('Dobble', 'Velocidad', NULL, 2010, 4, 4);

INSERT INTO Usuario (nombre, apellido, telefono, email)
VALUES
('María','González','11-1234-5678','maria@example.com'),
('Pedro','Pérez','11-8765-4321','pedro@example.com');

INSERT INTO Pago (id_usuario, monto, tipo_pago, descripcion)
VALUES (1, 4000.00, 'donacion', 'Donacion de apoyo');

INSERT INTO EstadisticaPrestamo (id_juego, anio, mes, prestamos, devoluciones)
VALUES (1, YEAR(CURRENT_DATE), MONTH(CURRENT_DATE), 0, 0)
ON DUPLICATE KEY UPDATE prestamos = prestamos;