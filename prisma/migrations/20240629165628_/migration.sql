/*
  Warnings:

  - You are about to drop the `Prodi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mahasiswa" DROP CONSTRAINT "Mahasiswa_prodi_id_fkey";

-- DropForeignKey
ALTER TABLE "Pejabat" DROP CONSTRAINT "Pejabat_prodi_id_fkey";

-- DropTable
DROP TABLE "Prodi";
