//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listKelompokIndikator = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const role = await prisma.kelompok_indikator.findMany({
      skip: startIndex,
      take: limit,
    });

    const totalCount = await prisma.kelompok_indikator.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching indikator" });
  }
};