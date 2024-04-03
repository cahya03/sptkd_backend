-- CreateTable
CREATE TABLE "Admin" (
    "adminid" SERIAL NOT NULL,
    "nama_admin" VARCHAR(255) NOT NULL,
    "email_admin" TEXT NOT NULL,
    "password_admin" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminid")
);

-- CreateTable
CREATE TABLE "Penilai" (
    "penilaiid" SERIAL NOT NULL,
    "nrp_penilai" VARCHAR(255) NOT NULL,
    "nama_penilai" VARCHAR(255) NOT NULL,
    "email_penilai" TEXT NOT NULL,
    "password_penilai" VARCHAR(255) NOT NULL,
    "pletonid" INTEGER NOT NULL,

    CONSTRAINT "Penilai_pkey" PRIMARY KEY ("penilaiid")
);

-- CreateTable
CREATE TABLE "Indikator" (
    "indikatorid" SERIAL NOT NULL,
    "nama_indikator" VARCHAR(255) NOT NULL,
    "bobot_indikator" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Indikator_pkey" PRIMARY KEY ("indikatorid")
);

-- CreateTable
CREATE TABLE "Hasilpenilaian" (
    "hasilpenilaianid" SERIAL NOT NULL,
    "nilai" DECIMAL(65,30) NOT NULL,
    "penilaiid" INTEGER NOT NULL,
    "mahasiswaid" INTEGER NOT NULL,
    "indikatorid" INTEGER NOT NULL,
    "pletonid" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hasilpenilaian_pkey" PRIMARY KEY ("hasilpenilaianid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_admin_key" ON "Admin"("email_admin");

-- CreateIndex
CREATE UNIQUE INDEX "Penilai_nrp_penilai_key" ON "Penilai"("nrp_penilai");

-- CreateIndex
CREATE UNIQUE INDEX "Penilai_email_penilai_key" ON "Penilai"("email_penilai");

-- CreateIndex
CREATE UNIQUE INDEX "Penilai_pletonid_key" ON "Penilai"("pletonid");

-- AddForeignKey
ALTER TABLE "Penilai" ADD CONSTRAINT "Penilai_pletonid_fkey" FOREIGN KEY ("pletonid") REFERENCES "Pleton"("pletonid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasilpenilaian" ADD CONSTRAINT "Hasilpenilaian_penilaiid_fkey" FOREIGN KEY ("penilaiid") REFERENCES "Penilai"("penilaiid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasilpenilaian" ADD CONSTRAINT "Hasilpenilaian_mahasiswaid_fkey" FOREIGN KEY ("mahasiswaid") REFERENCES "Mahasiswa"("mahasiswaid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasilpenilaian" ADD CONSTRAINT "Hasilpenilaian_indikatorid_fkey" FOREIGN KEY ("indikatorid") REFERENCES "Indikator"("indikatorid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hasilpenilaian" ADD CONSTRAINT "Hasilpenilaian_pletonid_fkey" FOREIGN KEY ("pletonid") REFERENCES "Pleton"("pletonid") ON DELETE RESTRICT ON UPDATE CASCADE;
