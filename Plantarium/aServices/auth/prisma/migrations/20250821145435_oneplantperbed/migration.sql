/*
  Warnings:

  - A unique constraint covering the columns `[bed_id]` on the table `bed_plants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `unique_bed_has_only_one_plant` ON `bed_plants`(`bed_id`);
