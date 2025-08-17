/*
  Warnings:

  - You are about to drop the column `watered` on the `beds` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `plants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `beds` DROP COLUMN `watered`;

-- AlterTable
ALTER TABLE `plants` DROP COLUMN `image`,
    ADD COLUMN `watered` BOOLEAN NULL DEFAULT false;
