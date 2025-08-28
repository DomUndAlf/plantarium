/*
  Warnings:

  - You are about to drop the column `type` on the `surfaces` table. All the data in the column will be lost.
  - You are about to drop the `textures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `surfaces` DROP FOREIGN KEY `surfaces_ibfk_2`;

-- AlterTable
ALTER TABLE `surfaces` DROP COLUMN `type`;

-- DropTable
DROP TABLE `textures`;
