/*
  Warnings:

  - A unique constraint covering the columns `[akun_id]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_akun_id_key" ON "Mahasiswa"("akun_id");
