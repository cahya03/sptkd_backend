/*
  Warnings:

  - You are about to drop the column `indikator_id` on the `Kelompok_indikator` table. All the data in the column will be lost.
  - Added the required column `kelompok_indikator_id` to the `Indikator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Kelompok_indikator" DROP CONSTRAINT "Kelompok_indikator_indikator_id_fkey";

-- AlterTable
ALTER TABLE "Indikator" ADD COLUMN     "kelompok_indikator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Kelompok_indikator" DROP COLUMN "indikator_id";

-- AddForeignKey
ALTER TABLE "Indikator" ADD CONSTRAINT "Indikator_kelompok_indikator_id_fkey" FOREIGN KEY ("kelompok_indikator_id") REFERENCES "Kelompok_indikator"("kelompok_indikator_id") ON DELETE RESTRICT ON UPDATE CASCADE;
