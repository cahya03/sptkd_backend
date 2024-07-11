//Impor modul
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listAkun = async (req, res) => {
  try {
    //Pagination
    const startIndex = parseInt(req.query?.start) || 0;
    const endIndex = parseInt(req.query?.end) || 99999;
    const limit = endIndex - startIndex;

    //Fetch data
    const akun = await prisma.akun.findMany({
      skip: startIndex,
      take: limit,
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

    const totalCount = await prisma.akun.count();
    res.header("Acces-Control-Expose-Headers", "X-Total-Count");
    res.header("X-Total-Count", totalCount);

    res.status(200).json(akun);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.createAkun = async (req, res) => {
  try {
    const {
      akun_username,
      akun_email,
      akun_password,
      akun_confPassword,
      akun_level_id,
    } = req.body;

    //Check if user already exists
    console.log(req.body);
    const userExists = await prisma.akun.findUnique({
      where: {
        akun_email: akun_email,
      },
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Check if password and confirm password match
    if (akun_password !== akun_confPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    //Hash password
    const hashedPassword = await argon2.hash(akun_password, 10);

    //Create user
    const createdAkun = await prisma.akun.create({
      data: {
        akun_username: akun_username,
        akun_email: akun_email,
        akun_password: hashedPassword,
        akun_level_id: parseInt(akun_level_id),
      },
    });
    res
      .status(201)
      .json({
        message: "Akun Registered Succesfully",
        akun_id: createdAkun.akun_id,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.showAkun = async (req, res) => {
  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    if (!akun) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(akun);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

exports.updateAkun = async (req, res) => {
  const akun = await prisma.akun.findUnique({
    where: {
      akun_id: parseInt(req.params.id),
    },
  });
  if (!akun) {
    return res.status(404).json({ message: "User not found" });
  }
  const {
    akun_username,
    akun_email,
    akun_password,
    akun_confPassword,
    akun_level_id,
  } = req.body;
  let hashedPassword;
  if (akun_password === "" || akun_password === null) {
    hashedPassword = akun.akun_password;
  } else {
    hashedPassword = await argon2.hash(akun_password);
  }
  if (akun_password !== akun_confPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const updatedData = {
    akun_username: akun_username,
    akun_email: akun_email,
    akun_password: hashedPassword,
    akun_level_id: parseInt(akun_level_id),
  };

  try {
    const updatedAkun = await prisma.akun.update({
      where: {
        akun_id: parseInt(req.params.id),
      },
      data: updatedData,
    });
    res.status(200).json({ message: "Akun Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAkun = async (req, res) => {
  try {
    const akun = await prisma.akun.findUnique({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    if (!akun) {
      return res.status(404).json({ message: "User not found" });
    }
    await prisma.akun.delete({
      where: {
        akun_id: parseInt(req.params.id),
      },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
