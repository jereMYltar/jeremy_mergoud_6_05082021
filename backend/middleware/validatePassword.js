const schema = require('../models/password');

module.exports = (req, res, next) => {
    if (!schema.validate(req.body.password)) {
        res.status(400).json({
            error: 'Mot de passe trop simple!'
        })
    }
    else {
        next();
    }
};