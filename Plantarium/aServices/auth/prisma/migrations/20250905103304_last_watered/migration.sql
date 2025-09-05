/*
  Warnings:

  - You are about to drop the column `watered` on the `individual_plants` table. All the data in the column will be lost.
  - You are about to drop the column `watered` on the `plants` table. All the data in the column will be lost.
  - You are about to drop the column `background_image_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `individual_plants` DROP COLUMN `watered`,
    ADD COLUMN `last_watered` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `plants` DROP COLUMN `watered`,
    ADD COLUMN `last_watered` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `background_image_url`;
