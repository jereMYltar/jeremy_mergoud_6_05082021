const schema = require('../models/password');

module.exports = (req, res, next) => {
    if (!!schema.validate(req.body.password)) {
        next();
    }
    else {
        throw new Error();
        // res.status(400).json({ error: 'Mot de passe trop simple!' })
    }
};