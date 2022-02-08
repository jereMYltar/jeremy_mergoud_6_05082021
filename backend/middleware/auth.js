const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config()

module.exports = (req, res, next) => {
    //version initiale
    // try {
    //     const token = req.headers.authorization.split(' ')[1];
    //     const decodedToken = jwt.verify(token, `${process.env.JWT_SALT}`);
    //     const userId = decodedToken.userId;
    //     if (req.body.userId && req.body.userId !== userId) {
    //         throw 'Invalid user ID';
    //     } else {
    //         next();
    //     }
    // } catch {
    //     res.status(403).json({
    //         error: 'unauthorized request'
    //     });
    // }

    //version modifiée
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_SALT}`);
        const userId = decodedToken.userId;
        User.findOne({_id: userId})
            .then((user) => {
                next();
            })
    //le .catch est-il utile ici ? Si je ne le mets pas, j'ai l'impression que le try n'abouti pas et que le second catch prend le relais
            .catch((error) => {
                throw(error)
            });
    } catch {
        res.status(403).json({ error : 'unauthorized request.' })
    }
};

