const isInvalidFormat = require("./is-invalid-format");
const validator = require("validator")

async function validateChangePassword(data, oldPassword) {
    let errors = {}


    if (isInvalidFormat(data.current_password)) {
        errors.current_password = "format current_password tidak valid"
    }

    if (isInvalidFormat(data.new_password)) {
        errors.new_password = "format new_password tidak valid"
    }

    if (isInvalidFormat(data.confirm_new_password)) {
        errors.confirm_new_password = "format confirm_new_password tidak valid"
    }


    if (!validator.equals(oldPassword, data.current_password)) {
        errors.check_equality_current_password = "current_password salah"
    }

    if (!validator.equals(data.confirm_new_password, data.new_password)) {
        errors.check_equality_new_password = "new_password dan confirm_new_password harus sama"
    }

    const isValid = (Object.keys(errors).length === 0);

    return { isValid, errors };

}

module.exports = validateChangePassword;