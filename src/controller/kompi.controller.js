const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listKompi = async (req, res) => {
  try {
    const kompi = await prisma.kompi.findMany({
      select: {
        kompi_id: true,
        kompi_kode: true,
        batalyon_id: true,
      },
    });
    res.status(200).json(kompi);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Kompi" });
  }
};

exports.listKompibyBatalyonID = async (req, res) => {
  try {
    const batalyonId = req.params.id;
    const kompi = await prisma.kompi.findMany({
      where: {
        batalyon_id: parseInt(batalyonId),
      },
      select: {
        kompi_id: true,
        kompi_kode: true,
        batalyon_id: true,
      },
    });
    res.status(200).json(kompi);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Kompi" });
  }
};
