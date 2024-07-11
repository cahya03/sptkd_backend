//Impor modul
const { PrismaClient } = require("@prisma/client");
const { request } = require("express");
const prisma = new PrismaClient();

exports.listMahasiswa = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const mahasiswa = await prisma.mahasiswa.findMany({
      skip: startIndex,
      take: limit,
      select: {
        mahasiswa_id: true,
        mahasiswa_nama: true,
        mahasiswa_nim: true,
        mahasiswa_tanggallahir: true,
        peleton: {
          select: {
            peleton_nama: true,
          },
        },
      },
    });

    const totalCount = await prisma.mahasiswa.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching Mahasiswa" });
  }
};

exports.showMahasiswa = async (req, res) => {
  try {
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { mahasiswa_id: parseInt(req.params.id) },
      select: {
        mahasiswa_id: true,
        mahasiswa_nama: true,
        mahasiswa_nim: true,
        mahasiswa_tanggallahir: true,
        peleton: {
          select: {
            peleton_nama: true,
          },
        },
      },
    });
    if (!mahasiswa) {
      return res.status(404).json({ message: "Mahasiswa not found" });
    }
    res.status(200).json(mahasiswa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching Mahasiswa" });
  }
};

exports.createMahasiswa = async (req, res) => {
  try {
    const {
      mahasiswa_nama,
      mahasiswa_nim,
      mahasiswa_tanggallahir,
      akun_id,
      peleton_id,
    } = req.body;

    //Check if Mahasiswa already exists
    const mahasiswaExists = await prisma.mahasiswa.findUnique({
      where: {
        mahasiswa_nim: mahasiswa_nim,
      },
    });
    if (mahasiswaExists) {
      return res.status(400).json({ message: "Mahasiswa already exists" });
    }

    //Create Mahasiswa
    const createdMahasiswa = await prisma.mahasiswa.create({
      data: {
        mahasiswa_nama: mahasiswa_nama,
        mahasiswa_nim: mahasiswa_nim,
        mahasiswa_tanggallahir: mahasiswa_tanggallahir,
        akun_id: parseInt(akun_id),
        peleton_id: parseInt(peleton_id),
      },
    });
    res.status(201).json(createdMahasiswa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating Mahasiswa" });
  }
};

exports.updateMahasiswa = async (req, res) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: { mahasiswa_id: parseInt(req.params.id) },
  });
  if (!mahasiswa) {
    return res.status(404).json({ message: "Mahasiswa not found" });
  }
  const { mahasiswa_nama, mahasiswa_nim, mahasiswa_tanggallahir, peleton_id } =
    req.body;
  const updatedData = {
    mahasiswa_nama: mahasiswa_nama,
    mahasiswa_nim: mahasiswa_nim,
    mahasiswa_tanggallahir: mahasiswa_tanggallahir,
    peleton_id: parseInt(peleton_id),
  };
  try {
    const createdMahasiswa = await prisma.mahasiswa.update({
      where: { mahasiswa_id: parseInt(req.params.id) },
      data: updatedData,
    });
    res.status(201).json({ message: "Mahasiswa Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating Mahasiswa" });
  }
};

exports.deleteMahasiswa = async (req,res) => {
  try {
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { mahasiswa_id: parseInt(req.params.id) },
    });
    if (!mahasiswa) {
      return res.status(404).json({ message: "Mahasiswa not found" });
    }
    await prisma.mahasiswa.delete({
      where: { mahasiswa_id: parseInt(req.params.id) },
    });
    res.status(200).json({ message: "Mahasiswa deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};