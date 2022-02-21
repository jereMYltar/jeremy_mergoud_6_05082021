const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const rightscheck = require('../middleware/rights-check');
const sauceCtrl = require('../controllers/sauces');

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, rightscheck, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, rightscheck, sauceCtrl.deleteSauce);
router.post('/:id/like', auth,sauceCtrl.likeSauce);



module.exports = router;