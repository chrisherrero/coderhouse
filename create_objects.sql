CREATE DATABASE Ludoteca3;
USE Ludoteca3;

CREATE TABLE Juego (
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    autor VARCHAR(100),
    anio_publicacion YEAR NULL,
    copias INT NOT NULL DEFAULT 1,
    copias_disponibles INT NOT NULL DEFAULT 1,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(30),
    email VARCHAR(100),
    registrado_en DATE NULL
);

CREATE TABLE Prestamo (
    id_prestamo INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    fecha_prestamo DATE NULL,
    fecha_devolucion DATE NULL,
    devuelto BOOLEAN NOT NULL DEFAULT FALSE,
    observaciones TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_juego) REFERENCES Juego(id_juego)
);

CREATE TABLE Pago (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATE NULL,
    tipo_pago ENUM('donacion','cuota','multa') DEFAULT 'cuota',
    descripcion VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE EstadisticaPrestamo (
    id_estadistica INT AUTO_INCREMENT PRIMARY KEY,
    id_juego INT NOT NULL,
    anio INT NOT NULL,
    mes TINYINT NOT NULL,
    prestamos INT DEFAULT 0,
    devoluciones INT DEFAULT 0,
    UNIQUE KEY uq_juego_periodo (id_juego, anio, mes),
    FOREIGN KEY (id_juego) REFERENCES Juego(id_juego)
);

CREATE OR REPLACE VIEW vista_prestamos_activos AS
SELECT p.id_prestamo, u.id_usuario, CONCAT(u.nombre,' ',u.apellido) AS usuario,
       j.id_juego, j.titulo AS juego, p.fecha_prestamo, p.observaciones
FROM Prestamo p
JOIN Usuario u ON p.id_usuario = u.id_usuario
JOIN Juego j ON p.id_juego = j.id_juego
WHERE p.devuelto = FALSE;

CREATE OR REPLACE VIEW vista_catalogo_publico AS
SELECT id_juego, titulo, categoria, copias_disponibles
FROM Juego;

CREATE OR REPLACE VIEW vista_usuarios_prestamos_count AS
SELECT u.id_usuario, CONCAT(u.nombre,' ',u.apellido) AS usuario,
       COUNT(p.id_prestamo) AS prestamos_activos
FROM Usuario u
LEFT JOIN Prestamo p ON u.id_usuario = p.id_usuario AND p.devuelto = FALSE
GROUP BY u.id_usuario;

DELIMITER $$
CREATE FUNCTION fn_dias_retraso(p_id_prestamo INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE v_devol DATE;
    DECLARE v_prest DATE;
    DECLARE v_diff INT;
    SELECT fecha_devolucion, fecha_prestamo INTO v_devol, v_prest FROM Prestamo WHERE id_prestamo = p_id_prestamo;
    IF v_prest IS NULL THEN
        RETURN NULL;
    END IF;
    IF v_devol IS NULL THEN
        SET v_diff = DATEDIFF(CURRENT_DATE, v_prest);
    ELSE
        SET v_diff = DATEDIFF(v_devol, v_prest);
    END IF;
    RETURN v_diff;
END $$

CREATE FUNCTION fn_juegos_disponibles(p_id_juego INT) RETURNS BOOLEAN DETERMINISTIC
BEGIN
    DECLARE v_disp INT;
    SELECT copias_disponibles INTO v_disp FROM Juego WHERE id_juego = p_id_juego;
    RETURN IFNULL(v_disp,0) > 0;
END $$

CREATE PROCEDURE sp_registrar_prestamo(IN p_id_usuario INT, IN p_id_juego INT)
BEGIN
    DECLARE v_disp INT;
    START TRANSACTION;
    SELECT copias_disponibles INTO v_disp FROM Juego WHERE id_juego = p_id_juego FOR UPDATE;
    IF v_disp IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Juego no existe';
    ELSEIF v_disp <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay copias disponibles';
    ELSE
        INSERT INTO Prestamo (id_usuario, id_juego, fecha_prestamo, devuelto) VALUES (p_id_usuario, p_id_juego, CURRENT_DATE, FALSE);
        UPDATE Juego SET copias_disponibles = copias_disponibles - 1 WHERE id_juego = p_id_juego;
        INSERT INTO EstadisticaPrestamo (id_juego, anio, mes, prestamos)
        VALUES (p_id_juego, YEAR(CURRENT_DATE), MONTH(CURRENT_DATE), 1)
        ON DUPLICATE KEY UPDATE prestamos = prestamos + 1;
    END IF;
    COMMIT;
END $$

CREATE PROCEDURE sp_devolver_prestamo(IN p_id_prestamo INT)
BEGIN
    DECLARE v_id_juego INT;
    START TRANSACTION;
    SELECT id_juego INTO v_id_juego FROM Prestamo WHERE id_prestamo = p_id_prestamo FOR UPDATE;
    IF v_id_juego IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Prestamo inexistente';
    ELSEIF (SELECT devuelto FROM Prestamo WHERE id_prestamo = p_id_prestamo) = TRUE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Prestamo ya devuelto';
    ELSE
        UPDATE Prestamo SET devuelto = TRUE, fecha_devolucion = CURRENT_DATE WHERE id_prestamo = p_id_prestamo;
        UPDATE Juego SET copias_disponibles = copias_disponibles + 1 WHERE id_juego = v_id_juego;
        INSERT INTO EstadisticaPrestamo (id_juego, anio, mes, devoluciones)
        VALUES (v_id_juego, YEAR(CURRENT_DATE), MONTH(CURRENT_DATE), 1)
        ON DUPLICATE KEY UPDATE devoluciones = devoluciones + 1;
    END IF;
    COMMIT;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_usuario_before_insert
BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
    IF NEW.registrado_en IS NULL THEN
        SET NEW.registrado_en = CURRENT_DATE;
    END IF;
END $$

CREATE TRIGGER trg_pago_before_insert
BEFORE INSERT ON Pago
FOR EACH ROW
BEGIN
    IF NEW.fecha_pago IS NULL THEN
        SET NEW.fecha_pago = CURRENT_DATE;
    END IF;
END $$

CREATE TRIGGER trg_prestamo_before_insert
BEFORE INSERT ON Prestamo
FOR EACH ROW
BEGIN
    DECLARE v_disp INT;
    SELECT copias_disponibles INTO v_disp FROM Juego WHERE id_juego = NEW.id_juego;
    IF v_disp IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Juego inexistente';
    END IF;
    IF v_disp <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay copias disponibles para prestar';
    END IF;
    IF NEW.fecha_prestamo IS NULL THEN
        SET NEW.fecha_prestamo = CURRENT_DATE;
    END IF;
END $$
DELIMITER ;
