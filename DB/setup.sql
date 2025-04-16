-- Nutzer bzw Gartendetails
CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `shibboleth_id` VARCHAR(255) UNIQUE NOT NULL,
  `location` VARCHAR(255), -- Koordinaten des Gartens
  `width` FLOAT,
  `height` FLOAT,
  `background_image_url` VARCHAR(255)
);

-- Pflanzentypen
CREATE TABLE `plant_types` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) UNIQUE NOT NULL
);

-- Pflanzen
CREATE TABLE `plants` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type_id` INT NOT NULL,
  `growth_type` ENUM('beet', 'single') NOT NULL,
  `edible` BOOLEAN DEFAULT false,
  `watering_interval` INT NOT NULL DEFAULT 3,
  `bloom_start_month` INT,
  `bloom_end_month` INT,
  `harvest_start_month` INT,
  `harvest_end_month` INT,
  `image` BLOB,
  FOREIGN KEY (`type_id`) REFERENCES `plant_types` (`id`) ON DELETE CASCADE
);

-- Beete
CREATE TABLE `beds` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(255),
  `x_position` FLOAT NOT NULL,
  `y_position` FLOAT NOT NULL,
  `width` FLOAT NOT NULL,
  `height` FLOAT NOT NULL,
  `watered` BOOLEAN DEFAULT false,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- Pflanzen in Beeten (ohne eigene ID, stattdessen kombinierter Primärschlüssel)
CREATE TABLE `bed_plants` (
  `bed_id` INT NOT NULL,
  `plant_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `planting_date` DATE NOT NULL,
  PRIMARY KEY (`bed_id`, `plant_id`),
  FOREIGN KEY (`bed_id`) REFERENCES `beds` (`id`) ON DELETE CASCADE, 
  FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE
);

-- Einzelpflanzen mit exakter Position
CREATE TABLE `individual_plants` (
  `user_id` INT NOT NULL,
  `plant_id` INT NOT NULL,
  `x_position` FLOAT NOT NULL,
  `y_position` FLOAT NOT NULL,
  `planting_date` DATE NOT NULL,
  `watered` BOOLEAN DEFAULT false,
  PRIMARY KEY (`user_id`, `plant_id`, `x_position`, `y_position`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`plant_id`) REFERENCES `plants` (`id`) ON DELETE CASCADE
);

-- Strukturflächen im Garten (Wiese, Weg, Beet, Gebäude)
CREATE TABLE `surfaces` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` ENUM('wiese', 'weg', 'beet', 'gebäude') NOT NULL,
  `x_position` FLOAT NOT NULL,
  `y_position` FLOAT NOT NULL,
  `width` FLOAT NOT NULL,
  `height` FLOAT NOT NULL,
  `texture_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`texture_id`) REFERENCES `textures` (`id`) ON DELETE CASCADE
);

-- Texturen (zentral verwaltet, pro Flächentyp eine Textur)
CREATE TABLE `textures` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM('wiese', 'weg', 'beet', 'gebäude') UNIQUE NOT NULL,
  `image` BLOB NOT NULL
);
