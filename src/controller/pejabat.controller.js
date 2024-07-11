//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listPejabat = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const pejabat = await prisma.pejabat.findMany({
      skip: startIndex,
      take: limit,
      select: {
        pejabat_id: true,
        pejabat_nama: true,
        pejabat_nip: true,
        pejabat_jabatan: true,
        akun_id: true,
        peleton_id: true,
        peleton: {
          select: {
            peleton_nama: true,
          },
        },
      },
    });

    const totalCount = await prisma.pejabat.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(pejabat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching Mahasiswa" });
  }
};

exports.showPejabat = async (req, res) => {
  try {
    const pejabat = await prisma.pejabat.findUnique({
      where: { pejabat_id: parseInt(req.params.id) },
      select: {
        pejabat_id: true,
        pejabat_nama: true,
        pejabat_nip: true,
        pejabat_jabatan: true,
        akun_id: true,
        peleton_id: true,
        peleton: {
          select: {
            peleton_nama: true,
          },
        },
      },
    });
    if (!pejabat) {
      return res.status(404).json({ message: "Pejabat not found" });
    }
    res.status(200).json(pejabat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching Mahasiswa" });
  }
};

exports.createPejabat = async (req, res) => {
  try {
    const { pejabat_nama, pejabat_nip, pejabat_jabatan, akun_id, peleton_id } =
      req.body;

    //Check if Pejabat already exists
    const pejabatExists = await prisma.pejabat.findUnique({
      where: {
        pejabat_nip: pejabat_nip,
      },
    });
    if (pejabatExists) {
      return res.status(400).json({ message: "Pejabat already exists" });
    }

    //Create pejabat
    const createdPejabat = await prisma.pejabat.create({
      data: {
        pejabat_nama: pejabat_nama,
        pejabat_nip: pejabat_nip,
        pejabat_jabatan: pejabat_jabatan,
        akun_id: parseInt(akun_id),
        peleton_id: parseInt(peleton_id),
      },
    });
    res.status(201).json(createdPejabat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating Pejabat" });
  }
};

exports.updatePejabat = async (req, res) => {
  const pejabat = await prisma.pejabat.findUnique({
    where: {
      pejabat_id: parseInt(req.params.id),
    },
  });
  if (!pejabat) {
    return res.status(404).json({ message: "Pejabat not found" });
  }
  const { pejabat_nama, pejabat_nip, pejabat_jabatan, peleton_id } =
    req.body;
  const updatedData = {
    pejabat_nama: pejabat_nama,
    pejabat_nip: pejabat_nip,
    pejabat_jabatan: pejabat_jabatan,
    peleton_id: parseInt(peleton_id),
  };
  try {
    const createdPejabat = await prisma.pejabat.update({
      where: { pejabat_id: parseInt(req.params.id) },
      data: updatedData,
    });
    res.status(201).json({message: "Pejabat Updated Successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deletePejabat = async (req, res) => {
  try {
    const pejabat = await prisma.pejabat.findUnique({
      where: { pejabat_id: parseInt(req.params.id) },
    });
    if (!pejabat) {
      return res.status(404).json({ message: "Pejabat not found" });
    }
    await prisma.pejabat.delete({
      where: { pejabat_id: parseInt(req.params.id) },
    });
    res.status(200).json({ meesage: "Pejabat deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching Mahasiswa" });
  }
};
