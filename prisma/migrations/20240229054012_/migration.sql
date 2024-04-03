/*
  Warnings:

  - The primary key for the `Indikator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bobot_indikator` on the `Indikator` table. All the data in the column will be lost.
  - You are about to drop the column `indikatorid` on the `Indikator` table. All the data in the column will be lost.
  - You are about to drop the column `nama_indikator` on the `Indikator` table. All the data in the column will be lost.
  - The primary key for the `Pleton` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nama_pleton` on the `Pleton` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_pleton` on the `Pleton` table. All the data in the column will be lost.
  - You are about to drop the column `pletonid` on the `Pleton` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hasilpenilaian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mahasiswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Penilai` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `indikator_bobot` to the `Indikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indikator_nama` to the `Indikator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Indikator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hasilpenilaian" DROP CONSTRAINT "Hasilpenilaian_indikatorid_fkey";

-- DropForeignKey
ALTER TABLE "Hasilpenilaian" DROP CONSTRAINT "Hasilpenilaian_mahasiswaid_fkey";

-- DropForeignKey
ALTER TABLE "Hasilpenilaian" DROP CONSTRAINT "Hasilpenilaian_penilaiid_fkey";

-- DropForeignKey
ALTER TABLE "Hasilpenilaian" DROP CONSTRAINT "Hasilpenilaian_pletonid_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_pleton_mahasiswa_fkey";

-- DropForeignKey
ALTER TABLE "Penilai" DROP CONSTRAINT "Penilai_pletonid_fkey";

-- DropIndex
DROP INDEX "Pleton_nomor_pleton_key";

-- AlterTable
ALTER TABLE "Indikator" DROP CONSTRAINT "Indikator_pkey",
DROP COLUMN "bobot_indikator",
DROP COLUMN "indikatorid",
DROP COLUMN "nama_indikator",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "indikator_bobot" INTEGER NOT NULL,
ADD COLUMN     "indikator_id" SERIAL NOT NULL,
ADD COLUMN     "indikator_nama" VARCHAR(255) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Indikator_pkey" PRIMARY KEY ("indikator_id");

-- AlterTable
ALTER TABLE "Pleton" DROP CONSTRAINT "Pleton_pkey",
DROP COLUMN "nama_pleton",
DROP COLUMN "nomor_pleton",
DROP COLUMN "pletonid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pleton_id" SERIAL NOT NULL,
ADD COLUMN     "pleton_nama" VARCHAR(255),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD CONSTRAINT "Pleton_pkey" PRIMARY KEY ("pleton_id");

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Hasilpenilaian";

-- DropTable
DROP TABLE "Mahasiswa";

-- DropTable
DROP TABLE "Penilai";

-- CreateTable
CREATE TABLE "Akun" (
    "akun_id" SERIAL NOT NULL,
    "akun_nama" VARCHAR(255) NOT NULL,
    "akun_email" TEXT NOT NULL,
    "akun_password" TEXT NOT NULL,
    "akun_role" INTEGER NOT NULL,
    "akun_pleton" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Akun_pkey" PRIMARY KEY ("akun_id")
);

-- CreateTable
CREATE TABLE "akun_role" (
    "akun_role_id" SERIAL NOT NULL,
    "akun_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "akun_role_pkey" PRIMARY KEY ("akun_role_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_nama" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "akun_pleton" (
    "akun_pleton_id" SERIAL NOT NULL,
    "akun_id" INTEGER NOT NULL,
    "pleton_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "akun_pleton_pkey" PRIMARY KEY ("akun_pleton_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Akun_akun_email_key" ON "Akun"("akun_email");

-- AddForeignKey
ALTER TABLE "akun_role" ADD CONSTRAINT "akun_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_role" ADD CONSTRAINT "akun_role_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "Akun"("akun_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_pleton" ADD CONSTRAINT "akun_pleton_pleton_id_fkey" FOREIGN KEY ("pleton_id") REFERENCES "Pleton"("pleton_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "akun_pleton" ADD CONSTRAINT "akun_pleton_akun_id_fkey" FOREIGN KEY ("akun_id") REFERENCES "Akun"("akun_id") ON DELETE RESTRICT ON UPDATE CASCADE;
