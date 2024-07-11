//Impor modul
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listHasilPenilaian = async (req, res) => {
    try {
        //Pagination
        const startIndex = parseInt(req.query?.start) || 0;
        const endIndex = parseInt(req.query?.end) || 99999;
        const limit = endIndex - startIndex;
    
        //Fetch data
        const hasilPenilaian = await prisma.hasilPenilaian.findMany({
          skip: startIndex,
          take: limit,
        });

        const totalCount = await prisma.hasilPenilaian.count();
        res.header("Acces-Control-Expose-Headers", "X-Total-Count");
        res.header("X-Total-Count", totalCount);
    
        res.status(200).json(hasilPenilaian);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching hasil penilaian" });
    }
};

exports.createHasilPenilaian = async (req, res) => {
    
    try {
        const {hp_mahasiswa_id, hp_penilai_id, hp_indikator_id, hp_nilai} = req.body;
        const createdHasilPenilaian = await prisma.hasilPenilaian.create({
            data: {
                hp_mahasiswa_id: hp_mahasiswa_id,
                hp_penilai_id: hp_penilai_id,
                hp_indikator_id: hp_indikator_id,
                hp_nilai: hp_nilai
            },
        });
        res.status(201).json(createdHasilPenilaian);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating hasil penilaian" });
    }
}
