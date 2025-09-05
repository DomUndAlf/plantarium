/*
  Warnings:

  - You are about to drop the column `texture_id` on the `surfaces` table. All the data in the column will be lost.
  - Added the required column `type` to the `surfaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `texture_id` ON `surfaces`;

-- AlterTable
ALTER TABLE `surfaces` DROP COLUMN `texture_id`,
    ADD COLUMN `type` ENUM('wiese', 'weg', 'beet', 'gebäude') NOT NULL;
