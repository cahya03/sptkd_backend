const express = require('express')
const router = express.Router();

const penilaianController = require("../controller/penilaian.controller.js")
const auth = require("../middleware/auth_akun.middleware")


router.get('/api/penilaian', auth.verifyAkun, penilaianController.listPenilaian);
router.post('/api/penilaian', auth.verifyAkun ,penilaianController.insertPenilaianfromHeaderPage);
router.get('/api/penilaian/:header_penilaian_id', auth.verifyAkun, penilaianController.listPenilaianbyHeaderId);

module.exports = router;