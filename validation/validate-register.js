const isInvalidFormat = require("./is-invalid-format");
const isInvalidHobbies = require("./is-invalid-hobbies");
const validator = require("validator");
const City = require("../models/city");
const User = require("../models/user");
const mongoose = require("mongoose")

async function validateRegister(data) {
    let errors = {};
    let getCity = "";

    if (isInvalidFormat(data.email) || !validator.isEmail(data.email)) {
        errors.email = "email tidak valid"
    }

    await User.findOne({ email: data.email }).then(found => {
        if (found) {
            errors.email = "email sudah digunakan"
        }
    })

    if (isInvalidFormat(data.password)) {
        errors.password = "password tidak valid"
    }

    if (isInvalidFormat(data.confirm_password)) {
        errors.confirm_password = "confirm password tidak valid"
    }

    if (!validator.equals(data.confirm_password, data.password)) {
        errors.password_equal = "password dan confirm_password harus sama";
    }

    if (isInvalidFormat(data.address)) {
        errors.address = "address tidak valid"
    }

    if (isInvalidFormat(data.cityId) || !mongoose.Types.ObjectId.isValid(data.cityId)) {
        errors.cityId = "cityId tidak valid"
    } else {
        getCity = await City.findById(data.cityId);

        if (getCity === null) {
            errors.cityId = "cityId tidak valid"
        }
    }

    if (isInvalidFormat(data.name)) {
        errors.name = "nama tidak valid"
    }

    if (isInvalidHobbies(data.hobbies)) {
        errors.hobbies = "hobbies tidak valid"
    }

    const isValid = (Object.keys(errors).length === 0);

    return {
        errors,
        isValid,
        getCity
    }
}

module.exports = validateRegister;