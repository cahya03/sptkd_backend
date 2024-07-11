const express = require('express');
const router = express.Router();

const akunLevelController = require('../controller/akun_level.controller')

router.get('/api/akunlevel', akunLevelController.listAkunLevel);
router.post('/api/akunlevel', akunLevelController.createAkunLevel);
router.delete('/api/akunlevel/:id', akunLevelController.deleteAkunLevel);

module.exports = router