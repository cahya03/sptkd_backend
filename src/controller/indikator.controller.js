//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listIndikator = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const indikator = await prisma.indikator.findMany({
      skip: startIndex,
      take: limit,
      select:{
        indikator_id: true,
        indikator_nama: true,
        indikator_bobot: true,
        kelompok_indikator: {
          select: {
            kelompok_indikator_nama: true,
          },
        },
      },
    });

    const totalCount = await prisma.indikator.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(indikator);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching indikator" });
  }
};

exports.createIndikator = async (req, res) => {
  try {
    const { indikator_nama, indikator_bobot } = req.body;

    //Check if already exists
    const IndikatorExists = await prisma.indikator.findUnique({
      where: {
        indikator_nama: indikator_nama,
      },
    });
    if (IndikatorExists) {
      return res.status(400).json({ message: "Indikator already exists" });
    }

    //Create role
    const createdIndikator = await prisma.indikator.create({
      data: {
        indikator_nama: indikator_nama,
        indikator_bobot: parseInt(indikator_bobot),
      },
    });
    res.status(201).json(createdIndikator);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating indikator" });
  }
};

exports.deleteIndikator = async (req, res) => {
  try {
    const indikator = await prisma.indikator.findUnique({
      where: {
        indikator_id: parseInt(req.params.id),
      },
    });
    if (!indikator) {
      return res.status(404).json({ message: "Indikator not found" });
    }
    await prisma.indikator.delete({
      where: {
        indikator_id: parseInt(req.params.id),
      },
    });
    res.status(200).json({ message: "Indikator deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting indikator" });
  }
};
