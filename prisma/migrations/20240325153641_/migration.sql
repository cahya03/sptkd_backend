/*
  Warnings:

  - You are about to drop the column `akun_nama` on the `Akun` table. All the data in the column will be lost.
  - You are about to drop the column `akun_pleton` on the `Akun` table. All the data in the column will be lost.
  - You are about to drop the column `akun_role` on the `Akun` table. All the data in the column will be lost.
  - You are about to drop the column `hp_indikator_id` on the `HasilPenilaian` table. All the data in the column will be lost.
  - You are about to drop the column `hp_mahasiswa_id` on the `HasilPenilaian` table. All the data in the column will be lost.
  - You are about to drop the column `hp_penilai_id` on the `HasilPenilaian` table. All the data in the column will be lost.
  - You are about to drop the column `indikator_bobot` on the `Indikator` table. All the data in the column will be lost.
  - You are about to drop the `Pleton` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `akun_pleton` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `akun_role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `akun_level_id` to the `Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `akun_username` to the `Akun` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp_nilai` to the `HasilPenilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indikator_id` to the `HasilPenilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswa_id` to the `HasilPenilaian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pejabat_id` to the `HasilPenilaian` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HasilPenilaian" DROP CONSTRAINT "HasilPenilaian_hp_indikator_id_fkey";

-- DropForeignKey
ALTER TABLE "HasilPenilaian" DROP CONSTRAINT "HasilPenilaian_hp_mahasiswa_id_fkey";

-- DropForeignKey
ALTER TABLE "HasilPenilaian" DROP CONSTRAINT "HasilPenilaian_hp_penilai_id_fkey";

-- DropForeignKey
ALTER TABLE "akun_pleton" DROP CONSTRAINT "akun_pleton_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "akun_pleton" DROP CONSTRAINT "akun_pleton_pleton_id_fkey";

-- DropForeignKey
ALTER TABLE "akun_role" DROP CONSTRAINT "akun_role_akun_id_fkey";

-- DropForeignKey
ALTER TABLE "akun_role" DROP CONSTRAINT "akun_role_role_id_fkey";

-- DropIndex
DROP INDEX "Akun_akun_email_key";

-- AlterTable
ALTER TABLE "Akun" DROP COLUMN "akun_nama",
DROP COLUMN "akun_pleton",
DROP COLUMN "akun_role",
ADD COLUMN     "akun_level_id" INTEGER NOT NULL,
ADD COLUMN     "akun_username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HasilPenilaian" DROP COLUMN "hp_indikator_id",
DROP COLUMN "hp_mahasiswa_id",
DROP COLUMN "hp_penilai_id",
ADD COLUMN     "hp_nilai" INTEGER NOT NULL,
ADD COLUMN     "indikator_id" INTEGER NOT NULL,
ADD COLUMN     "mahasiswa_id" INTEGER NOT NULL,
ADD COLUMN     "pejabat_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Indikator" DROP COLUMN "indikator_bobot",
ALTER COLUMN "indikator_nama" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Pleton";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "akun_pleton";

-- DropTable
DROP TABLE "akun_role";

-- CreateTable
CREATE TABLE "Akun_level" (
    "akun_level_id" SERIAL NOT NULL,
    "akun_level_nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Akun_level_pkey" PRIMARY KEY ("akun_level_id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "mahasiswa_id" SERIAL NOT NULL,
    "akun_id" INTEGER NOT NULL,
    "mahasiswa_nama" TEXT NOT NULL,
    "mahasiswa_nim" TEXT NOT NULL,
    "mahasiswa_prodi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("mahasiswa_id")
);

-- CreateTable
CREATE TABLE "Pejabat" (
    "pejabat_id" SERIAL NOT NULL,
    "akun_id" INTEGER NOT NULL,
    "pejabat_nama" TEXT NOT NULL,
    "pejabat_nip" TEXT NOT NULL,
    "pejabat_jabatan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pejabat_pkey" PRIMARY KEY ("pejabat_id")
);

-- AddForeignKey
ALTER TABLE "Akun" ADD CONSTRAINT "Akun_akun_level_id_fkey" FOREIGN KEY ("akun_level_id") REFERENCES "Akun_level"("akun_level_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "Akun"("akun_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pejabat" ADD CONSTRAINT "Pejabat_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "Akun"("akun_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPenilaian" ADD CONSTRAINT "HasilPenilaian_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("mahasiswa_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPenilaian" ADD CONSTRAINT "HasilPenilaian_pejabat_id_fkey" FOREIGN KEY ("pejabat_id") REFERENCES "Pejabat"("pejabat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilPenilaian" ADD CONSTRAINT "HasilPenilaian_indikator_id_fkey" FOREIGN KEY ("indikator_id") REFERENCES "Indikator"("indikator_id") ON DELETE RESTRICT ON UPDATE CASCADE;
