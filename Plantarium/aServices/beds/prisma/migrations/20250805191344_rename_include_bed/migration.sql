/*
  Warnings:

  - The values [beet] on the enum `plants_growth_type` will be removed. If these variants are still used in the database, this will fail.
  - The values [wiese,weg,beet,gebäude] on the enum `surfaces_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `plants` MODIFY `growth_type` ENUM('bed', 'single') NOT NULL;

-- AlterTable
ALTER TABLE `surfaces` MODIFY `type` ENUM('path', 'terrace', 'bed', 'building') NOT NULL;
