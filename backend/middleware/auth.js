const jwt = require('jsonwebtoken');
const User = require('../models/users');
const mongooseError = require('mongoose-error');
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_SALT}`);
        const userId = decodedToken.userId;
        User.findOne({_id: userId})
            .then((user) => {
                res.locals.userId = userId;
                next();
            })
            .catch((error) => {
                throw mongooseError(error)
                // res.status(404).json({ error : 'user not found.' })
            });
    } catch {
        throw new Error();
        // res.status(498).json({ error : 'unauthorized request.' })
    }
};

