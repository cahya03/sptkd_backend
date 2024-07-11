const express = require('express')
const router = express.Router();

const authController = require('../controller/auth.controller.js')

router.get('/me', authController.Me)
router.post('/login', authController.loginAkun)
router.delete('/logout', authController.logoutAkun)

module.exports = router;