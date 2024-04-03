-- CreateTable
CREATE TABLE "Pleton" (
    "pletonid" SERIAL NOT NULL,
    "nomor_pleton" TEXT NOT NULL,
    "nama_pleton" VARCHAR(255) NOT NULL,

    CONSTRAINT "Pleton_pkey" PRIMARY KEY ("pletonid")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "mahasiswaid" SERIAL NOT NULL,
    "nim_mahasiswa" INTEGER NOT NULL,
    "nama_mahasiswa" VARCHAR(255) NOT NULL,
    "email_mahasiswa" TEXT NOT NULL,
    "password_mahasiswa" VARCHAR(255) NOT NULL,
    "pletonid" INTEGER NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("mahasiswaid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pleton_nomor_pleton_key" ON "Pleton"("nomor_pleton");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_mahasiswa_key" ON "Mahasiswa"("nim_mahasiswa");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_email_mahasiswa_key" ON "Mahasiswa"("email_mahasiswa");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_pletonid_key" ON "Mahasiswa"("pletonid");

-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_pletonid_fkey" FOREIGN KEY ("pletonid") REFERENCES "Pleton"("pletonid") ON DELETE RESTRICT ON UPDATE CASCADE;
