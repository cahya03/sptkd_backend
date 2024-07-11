/*
  Warnings:

  - You are about to drop the column `bobot` on the `Indikator` table. All the data in the column will be lost.
  - Added the required column `header_penilaian_id` to the `Hasil_Penilaian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hasil_Penilaian" ADD COLUMN     "header_penilaian_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Indikator" DROP COLUMN "bobot";

-- CreateTable
CREATE TABLE "Kelompok_indikator" (
    "kelompok_indikator_id" SERIAL NOT NULL,
    "kelompok_indikator_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "indikator_id" INTEGER NOT NULL,

    CONSTRAINT "Kelompok_indikator_pkey" PRIMARY KEY ("kelompok_indikator_id")
);

-- AddForeignKey
ALTER TABLE "Kelompok_indikator" ADD CONSTRAINT "Kelompok_indikator_indikator_id_fkey" FOREIGN KEY ("indikator_id") REFERENCES "Indikator"("indikator_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasil_Penilaian" ADD CONSTRAINT "Hasil_Penilaian_header_penilaian_id_fkey" FOREIGN KEY ("header_penilaian_id") REFERENCES "header_penilaian"("header_penilaian_id") ON DELETE RESTRICT ON UPDATE CASCADE;
