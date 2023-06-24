const express = require('express');
const router = express.Router();

const City = require("../models/city");
const User = require("../models/user");
const validateRegister = require("../validation/validate-register")
const validateLogin = require("../validation/validate-login");
const validateChangePassword = require('../validation/validate-change-password');



router.get('/cities', async (req, res) => {
    try {
        const data = await City.find();
        const modifiedData = data.map(city => ({
            id: city._id,
            name: city.name
        }));
        return res.status(200).json(modifiedData)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        const { errors, isValid, getCity } = await validateRegister(data);


        if (!isValid) {
            return res.status(403).json(errors);
        }

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            profile: {
                name: req.body.name,
                address: req.body.address,
                city: {
                    id: getCity._id,
                    name: getCity.name
                },
                hobbies: req.body.hobbies
            }
        })

        newUser.save();
        return res.status(201).json();



    } catch (error) {
        console.log(error)
        return res.status(403).json({ error: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { isValid, getUser } = await validateLogin(req.body);

        if (!isValid) {
            return res.status(401).json();
        }

        getUser.last_login = Date.now();
        getUser.save();

        const data = {
            id: getUser._id,
            email: getUser.email,
            profile: {
                name: getUser.profile.name,
                address: getUser.profile.address,
                city: {
                    id: getUser.profile.city._id,
                    name: getUser.profile.city.name
                },
                hobbies: getUser.profile.hobbies
            },
            last_login: getUser.last_login,
            created_at: getUser.created_at,
            updated_at: getUser.updated_at,

        };

        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(401).json();
    }
});

router.get('/users/all', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = (page - 1) * limit;
        const users = await User.find().skip(startIndex).limit(limit);

        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json()
        }
        return res.status(200).json(user);

    } catch (error) {

        return res.status(404).json();
    }
})

router.patch('/users/current', async (req, res) => {
    try {

        const user = await User.findOne().sort({ last_login: -1 });

        const { isValid, errors } = await validateChangePassword(req.body, user.password);
        console.log(errors);

        if (!isValid) {
            return res.status(403).json(errors);
        }

        user.password = req.body.new_password;
        user.save()

        return res.status(201).json();

    } catch (error) {

        return res.status(404).json();
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json();
        }
        
        return res.status(201).json();
    } catch (error) {
        return res.status(404).json();
    }
})

module.exports = router;
