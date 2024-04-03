/*
  Warnings:

  - A unique constraint covering the columns `[akun_username]` on the table `Akun` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[akun_email]` on the table `Akun` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mahasiswa_nim]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pejabat_nip]` on the table `Pejabat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Akun_akun_username_key" ON "Akun"("akun_username");

-- CreateIndex
CREATE UNIQUE INDEX "Akun_akun_email_key" ON "Akun"("akun_email");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_mahasiswa_nim_key" ON "Mahasiswa"("mahasiswa_nim");

-- CreateIndex
CREATE UNIQUE INDEX "Pejabat_pejabat_nip_key" ON "Pejabat"("pejabat_nip");
