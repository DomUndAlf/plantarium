-- CreateTable
CREATE TABLE `bed_plants` (
    `bed_id` INTEGER NOT NULL,
    `plant_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `planting_date` DATE NOT NULL,

    INDEX `plant_id`(`plant_id`),
    PRIMARY KEY (`bed_id`, `plant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `beds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NULL,
    `x_position` FLOAT NOT NULL,
    `y_position` FLOAT NOT NULL,
    `width` FLOAT NOT NULL,
    `height` FLOAT NOT NULL,
    `watered` BOOLEAN NULL DEFAULT false,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `individual_plants` (
    `user_id` INTEGER NOT NULL,
    `plant_id` INTEGER NOT NULL,
    `x_position` FLOAT NOT NULL,
    `y_position` FLOAT NOT NULL,
    `planting_date` DATE NOT NULL,
    `watered` BOOLEAN NULL DEFAULT false,

    INDEX `plant_id`(`plant_id`),
    PRIMARY KEY (`user_id`, `plant_id`, `x_position`, `y_position`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plant_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type_id` INTEGER NOT NULL,
    `growth_type` ENUM('beet', 'single') NOT NULL,
    `edible` BOOLEAN NULL DEFAULT false,
    `watering_interval` INTEGER NOT NULL DEFAULT 3,
    `bloom_start_month` INTEGER NULL,
    `bloom_end_month` INTEGER NULL,
    `harvest_start_month` INTEGER NULL,
    `harvest_end_month` INTEGER NULL,
    `image` BLOB NULL,

    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surfaces` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `type` ENUM('wiese', 'weg', 'beet', 'gebäude') NOT NULL,
    `x_position` FLOAT NOT NULL,
    `y_position` FLOAT NOT NULL,
    `width` FLOAT NOT NULL,
    `height` FLOAT NOT NULL,
    `texture_id` INTEGER NOT NULL,

    INDEX `texture_id`(`texture_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `textures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('wiese', 'weg', 'beet', 'gebäude') NOT NULL,
    `image` BLOB NOT NULL,

    UNIQUE INDEX `type`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shibboleth_id` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NULL,
    `width` FLOAT NULL,
    `height` FLOAT NULL,
    `background_image_url` VARCHAR(255) NULL,

    UNIQUE INDEX `shibboleth_id`(`shibboleth_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bed_plants` ADD CONSTRAINT `bed_plants_ibfk_1` FOREIGN KEY (`bed_id`) REFERENCES `beds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bed_plants` ADD CONSTRAINT `bed_plants_ibfk_2` FOREIGN KEY (`plant_id`) REFERENCES `plants`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `beds` ADD CONSTRAINT `beds_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `individual_plants` ADD CONSTRAINT `individual_plants_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `individual_plants` ADD CONSTRAINT `individual_plants_ibfk_2` FOREIGN KEY (`plant_id`) REFERENCES `plants`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `plants` ADD CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `plant_types`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `surfaces` ADD CONSTRAINT `surfaces_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `surfaces` ADD CONSTRAINT `surfaces_ibfk_2` FOREIGN KEY (`texture_id`) REFERENCES `textures`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
