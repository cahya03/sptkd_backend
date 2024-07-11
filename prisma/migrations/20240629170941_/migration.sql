/*
  Warnings:

  - You are about to drop the column `prodi_id` on the `Mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the column `prodi_id` on the `Pejabat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "prodi_id";

-- AlterTable
ALTER TABLE "Pejabat" DROP COLUMN "prodi_id";
