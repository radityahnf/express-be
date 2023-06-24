const isInvalidFormat = require('./is-invalid-format');
const validator = require('validator');
const User = require('../models/user');

async function validateLogin(data) {
    let isValid = true;

    if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
        isValid = false;
    }

    if (isInvalidFormat(data.password)) {
        isValid = false;
    }

    const getUser = await User.findOne({
        email: data.email,
        password: data.password,
    });

    if (!getUser) {
        isValid = false;
    }

    return {isValid, getUser};
}

module.exports = validateLogin;
