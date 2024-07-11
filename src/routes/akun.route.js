const express = require('express');
const router = express.Router();

const akunController = require('../controller/akun.controller.js')
const auth = require('../middleware/auth_akun.middleware.js')

router.get('/api/akun', auth.verifyAkun, auth.adminOnly, akunController.listAkun);
router.get('/api/akun/:id', auth.verifyAkun, auth.adminOnly, akunController.showAkun);
router.post('/api/akun', auth.verifyAkun, auth.adminOnly, akunController.createAkun);
router.patch('/api/akun/:id', auth.verifyAkun, auth.adminOnly,akunController.updateAkun);
router.delete('/api/akun/:id',auth.verifyAkun, auth.adminOnly, akunController.deleteAkun);

module.exports = router;