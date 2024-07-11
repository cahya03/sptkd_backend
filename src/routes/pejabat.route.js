const express = require('express');
const router = express.Router();

const pejabatController = require('../controller/pejabat.controller.js');
const auth = require("../middleware/auth_akun.middleware.js")

router.get('/api/pejabat', auth.verifyAkun, auth.adminOnly, pejabatController.listPejabat);
router.get('/api/pejabat/:id', auth.verifyAkun, auth.adminOnly, pejabatController.showPejabat);
router.post('/api/pejabat', auth.verifyAkun, auth.adminOnly, pejabatController.createPejabat);
router.patch('/api/pejabat/:id', auth.verifyAkun, auth.adminOnly, pejabatController.updatePejabat);
router.delete('/api/pejabat/:id', auth.verifyAkun, auth.adminOnly, pejabatController.deletePejabat);

module.exports = router;