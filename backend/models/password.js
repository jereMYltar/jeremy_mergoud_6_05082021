const passwordvalidator = require('password-validator');

const schema = new passwordvalidator();

schema
    .is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits(4)
    .has().not().spaces()
    .has().symbols(2);

module.exports = schema;
