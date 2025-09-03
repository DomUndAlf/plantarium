/*
  Warnings:

  - You are about to drop the column `bloom_end_month` on the `plants` table. All the data in the column will be lost.
  - You are about to drop the column `bloom_start_month` on the `plants` table. All the data in the column will be lost.
  - You are about to drop the column `harvest_end_month` on the `plants` table. All the data in the column will be lost.
  - You are about to drop the column `harvest_start_month` on the `plants` table. All the data in the column will be lost.
  - You are about to drop the `plant_types` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `plants` DROP FOREIGN KEY `plants_ibfk_1`;

-- AlterTable
ALTER TABLE `plants` DROP COLUMN `bloom_end_month`,
    DROP COLUMN `bloom_start_month`,
    DROP COLUMN `harvest_end_month`,
    DROP COLUMN `harvest_start_month`;

-- DropTable
DROP TABLE `plant_types`;
