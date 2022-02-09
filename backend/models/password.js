const passwordvalidator = require('password-validator');

const schema = new passwordvalidator();

schema
    .is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits(3)
    .has().not().spaces()
    .has().symbols(1);

module.exports = schema;
