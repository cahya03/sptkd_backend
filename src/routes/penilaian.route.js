const express = require('express')
const router = express.Router();

const penilaianController = require("../controller/penilaian.controller.js")
const auth = require("../middleware/auth_akun.middleware")


router.get('/api/penilaian', auth.verifyAkun, penilaianController.listPenilaian);
router.post('/api/penilaian', auth.verifyAkun ,penilaianController.insertPenilaianfromHeaderPage);
router.get('/api/penilaian//header/:id', auth.verifyAkun, penilaianController.listPenilaianbyHeaderId);
router.get('/api/penilaian/pejabat/:pejabat_id', auth.verifyAkun, penilaianController.getPenilaianbyPejabat);
router.get('/api/penilaian/:id', auth.verifyAkun, penilaianController.getPenilaianbyId)
router.patch('/api/penilaian/:id', auth.verifyAkun, penilaianController.updatePenilaian)

module.exports = router;