CREATE DATABASE IF NOT EXISTS honors_inventory;
USE honors_inventory;

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(255) NOT NULL,
    building_type ENUM('Classroom', 'Office', 'Warehouse') NOT NULL
);

CREATE TABLE equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    equipment_type ENUM('Monitor', 'Mouse', 'Keyboard', 'Printer', 'Laptop', 'Other') NOT NULL,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
);

-- Sample data
INSERT INTO locations (room_name, building_type) VALUES
('HON 3017', 'Classroom'),
('HON 4015B', 'Office'),
('HON Warehouse', 'Warehouse'),
('HON 4015A','Office'),
('HON 2016','Classroom'),
('HON 1010','Classroom'),
('HON 1005A','Office'),
('HON 1004B','Office'),

INSERT INTO equipment (model, equipment_type, location_id) VALUES
('HP LaserJet', 'printer', 1),
('Dell Elite8', 'laptop', 2),
('Dell', 'monitor', 3),
('Dell', 'monitor', 3),
('Dell', 'monitor', 3),
('Dell', 'monitor', 3),
('Dell', 'monitor', 3),
('Logitech M220', 'mouse', 2),
('Keychron K5 Max', 'keyboard', 2),
('Keychron K5 Max', 'keyboard', 2),
('Logitech M220', 'mouse', 1),
('Logitech M220', 'mouse', 2),
('Keychron K5 Max', 'keyboard', 1);
