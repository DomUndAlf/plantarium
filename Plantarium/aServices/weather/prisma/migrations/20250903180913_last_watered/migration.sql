/*
  Warnings:

  - You are about to drop the column `watered` on the `individual_plants` table. All the data in the column will be lost.
  - You are about to drop the column `watered` on the `plants` table. All the data in the column will be lost.
  - You are about to drop the column `background_image_url` on the `users` table. All the data in the column will be lost.
  - Added the required column `last_watered` to the `individual_plants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_watered` to the `plants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `individual_plants` DROP COLUMN `watered`,
    ADD COLUMN `last_watered` DATE NOT NULL;

-- AlterTable
ALTER TABLE `plants` DROP COLUMN `watered`,
    ADD COLUMN `last_watered` DATE NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `background_image_url`;
