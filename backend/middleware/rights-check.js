const jwt = require('jsonwebtoken');
const Sauce = require('../models/sauces');
require('dotenv').config()

module.exports = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (res.locals.userId == sauce.userId) {
                next();
            } else {
                res.status(403).json({ error : 'unauthorized request.' });
            }
        })
        .catch((error) => {
            res.status(410).json({
                error : error
            });
        })
};

