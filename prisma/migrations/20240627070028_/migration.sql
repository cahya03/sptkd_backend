/*
  Warnings:

  - A unique constraint covering the columns `[akun_id]` on the table `Pejabat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pejabat_akun_id_key" ON "Pejabat"("akun_id");
