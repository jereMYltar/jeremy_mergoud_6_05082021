const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');

router.post('/api/auth/signup', );
router.post('/api/auth/login', );
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);
router.post('/', sauceCtrl.createSauce);
router.put('/:id', sauceCtrl.modifySauce);
router.delete('/:id', sauceCtrl.deleteSauce);



module.exports = router;