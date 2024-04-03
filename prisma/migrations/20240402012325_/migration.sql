/*
  Warnings:

  - You are about to drop the column `mahasiswa_prodi` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the `HasilPenilaian` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kelompok_indikator_id` to the `Indikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswa_tanggallahir` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peleton_id` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodi_id` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peleton_id` to the `Pejabat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prodi_id` to the `Pejabat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HasilPenilaian" DROP CONSTRAINT "HasilPenilaian_indikator_id_fkey";

-- DropForeignKey
ALTER TABLE "HasilPenilaian" DROP CONSTRAINT "HasilPenilaian_mahasiswa_id_fkey";

-- DropForeignKey
ALTER TABLE "HasilPenilaian" DROP CONSTRAINT "HasilPenilaian_pejabat_id_fkey";

-- AlterTable
ALTER TABLE "Indikator" ADD COLUMN     "kelompok_indikator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "mahasiswa_prodi",
ADD COLUMN     "mahasiswa_tanggallahir" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "peleton_id" INTEGER NOT NULL,
ADD COLUMN     "prodi_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pejabat" ADD COLUMN     "peleton_id" INTEGER NOT NULL,
ADD COLUMN     "prodi_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "HasilPenilaian";

-- CreateTable
CREATE TABLE "Kelompok_Indikator" (
    "kelompok_indikator_id" SERIAL NOT NULL,
    "kelompok_indikator_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kelompok_Indikator_pkey" PRIMARY KEY ("kelompok_indikator_id")
);

-- CreateTable
CREATE TABLE "Peleton" (
    "peleton_id" SERIAL NOT NULL,
    "kompi_id" INTEGER NOT NULL,
    "peleton_kode" TEXT NOT NULL,
    "peleton_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Peleton_pkey" PRIMARY KEY ("peleton_id")
);

-- CreateTable
CREATE TABLE "Kompi" (
    "kompi_id" SERIAL NOT NULL,
    "kompi_kode" TEXT NOT NULL,
    "kompi_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kompi_pkey" PRIMARY KEY ("kompi_id")
);

-- CreateTable
CREATE TABLE "Prodi" (
    "prodi_id" SERIAL NOT NULL,
    "prodi_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prodi_pkey" PRIMARY KEY ("prodi_id")
);

-- CreateTable
CREATE TABLE "Penilaian" (
    "penilaian_id" SERIAL NOT NULL,
    "indikator_id" INTEGER NOT NULL,
    "mahasiswa_id" INTEGER NOT NULL,
    "pejabat_id" INTEGER NOT NULL,
    "penilaian_nilai" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penilaian_pkey" PRIMARY KEY ("penilaian_id")
);

-- CreateTable
CREATE TABLE "Hasil_Penilaian" (
    "hasil_penilaian_id" SERIAL NOT NULL,
    "mahasiswa_id" INTEGER NOT NULL,
    "penilaian_nilai" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hasil_Penilaian_pkey" PRIMARY KEY ("hasil_penilaian_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Peleton_peleton_kode_key" ON "Peleton"("peleton_kode");

-- CreateIndex
CREATE UNIQUE INDEX "Kompi_kompi_kode_key" ON "Kompi"("kompi_kode");

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_peleton_id_fkey" FOREIGN KEY ("peleton_id") REFERENCES "Peleton"("peleton_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "Prodi"("prodi_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pejabat" ADD CONSTRAINT "Pejabat_peleton_id_fkey" FOREIGN KEY ("peleton_id") REFERENCES "Peleton"("peleton_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pejabat" ADD CONSTRAINT "Pejabat_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "Prodi"("prodi_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Indikator" ADD CONSTRAINT "Indikator_kelompok_indikator_id_fkey" FOREIGN KEY ("kelompok_indikator_id") REFERENCES "Kelompok_Indikator"("kelompok_indikator_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peleton" ADD CONSTRAINT "Peleton_kompi_id_fkey" FOREIGN KEY ("kompi_id") REFERENCES "Kompi"("kompi_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("mahasiswa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_pejabat_id_fkey" FOREIGN KEY ("pejabat_id") REFERENCES "Pejabat"("pejabat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_indikator_id_fkey" FOREIGN KEY ("indikator_id") REFERENCES "Indikator"("indikator_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasil_Penilaian" ADD CONSTRAINT "Hasil_Penilaian_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("mahasiswa_id") ON DELETE RESTRICT ON UPDATE CASCADE;
