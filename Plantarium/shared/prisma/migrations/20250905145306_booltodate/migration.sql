/*
  Warnings:

  - Added the required column `last_watered` to the `individual_plants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_watered` to the `plants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `individual_plants` DROP COLUMN `last_watered`,
    ADD COLUMN `last_watered` DATE NOT NULL;

-- AlterTable
ALTER TABLE `plants` DROP COLUMN `last_watered`,
    ADD COLUMN `last_watered` DATE NOT NULL;
