const argon2 = require("argon2");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.loginAkun = async (req, res) => {
  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_email: req.body.akun_email,
      },
      include: {
        level: true,
      },
    });
    if (!akun) {
      return res.status(404).json({ message: "Akun not found" });
    }
    const validPassword = await argon2.verify(
      akun.akun_password,
      req.body.akun_password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    req.session.akun_id = akun.akun_id;
    const akun_id = akun.akun_id;
    const akun_username = akun.akun_email;
    const akun_level_id = akun.akun_level_id;
    const akun_email = akun.akun_email;
    const akun_role = akun.level.akun_level_nama;
    res
      .status(200)
      .json({ akun_id, akun_username, akun_email, akun_level_id, akun_role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.Me = async (req, res) => {
  if (!req.session.akun_id) {
    return res.status(401).json({ message: "Please Login" });
  }
  const akun = await prisma.akun.findUnique({
    where: {
      akun_id: req.session.akun_id,
    },
    select: {
      akun_id: true,
      akun_username: true,
      akun_email: true,
      akun_level_id: true,
      level: {
        select: {
          akun_level_nama: true,
        },
      },
    },
  });
  if (!akun) {
    return res.status(404).json({ message: "Akun not found" });
  }
  const akun_role = akun.level.akun_level_nama;
  res.status(200).json({...akun, akun_role});
};

exports.logoutAkun = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ message: "Logged out" });
  });
};