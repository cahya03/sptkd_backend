const express = require('express');
const router = express.Router();
const akunController = require('../akun.controller');
const akunLevelController = require('../akun_level.controller');
const indikatorController = require('../indikator.controller');
const middleware = require('../middleware/auth.middleware');


router.get('/', (req, res) => {res.status(200).json({ message: 'Connected!'})});

//Routes Akun
router.get('/akun', akunController.listAkun);
router.get('/akun/:id', akunController.showAkun);
router.post('/akun', akunController.createAkun);
router.put('/akun/:id', akunController.updateAkun);
router.delete('/akun/:id', akunController.deleteAkun);
router.post('/akun/login', akunController.loginAkun)

//Routes Akun Level
router.get('/akunlevel', akunLevelController.listAkunLevel);
router.post('/akunlevel', akunLevelController.createAkunLevel);
router.delete('/akunlevel/:id', akunLevelController.deleteAkunLevel);

//Routes Indikator
router.get('/indikator', indikatorController.listIndikator);
router.post('/indikator', indikatorController.createIndikator);
router.delete('/indikator/:id', indikatorController.deleteIndikator);

module.exports = router;