const express = require('express')
const router = express.Router();

const mahasiswaController = require("../controller/mahasiswa.controller.js")
const auth = require('../middleware/auth_akun.middleware.js')

router.get('/api/mahasiswa', auth.verifyAkun, auth.adminOnly, mahasiswaController.listMahasiswa);
router.get('/api/mahasiswa/:id', auth.verifyAkun, auth.adminOnly, mahasiswaController.showMahasiswa);
router.post('/api/mahasiswa', auth.verifyAkun, auth.adminOnly, mahasiswaController.createMahasiswa);
router.patch('/api/mahasiswa/:id', auth.verifyAkun, auth.adminOnly, mahasiswaController.updateMahasiswa);
router.delete('/api/mahasiswa/"id', auth.verifyAkun, auth.adminOnly, mahasiswaController.deleteMahasiswa);

module.exports = router;