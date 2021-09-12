const express = require('express');
const router = express.Router();
const validatePassword = require('../middleware/validatePassword')

const userCtrl = require('../controllers/users');

router.post('/signup', validatePassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;