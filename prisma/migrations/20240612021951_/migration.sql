/*
  Warnings:

  - You are about to drop the column `kelompok_indikator_id` on the `Indikator` table. All the data in the column will be lost.
  - You are about to drop the `Kelompok_Indikator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bobot` to the `Indikator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Indikator" DROP CONSTRAINT "Indikator_kelompok_indikator_id_fkey";

-- AlterTable
ALTER TABLE "Indikator" DROP COLUMN "kelompok_indikator_id",
ADD COLUMN     "bobot" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Kelompok_Indikator";
