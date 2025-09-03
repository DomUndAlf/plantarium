/*
  Warnings:

  - You are about to drop the column `type_id` on the `plants` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `type_id` ON `plants`;

-- AlterTable
ALTER TABLE `plants` DROP COLUMN `type_id`;
