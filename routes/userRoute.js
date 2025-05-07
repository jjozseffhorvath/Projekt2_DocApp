const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res
                .status(200)
                .send({ message: "Már létezik ilyen e-mail címmel felhasználó", success: false });

        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPaswword = await bcrypt.hash(password, salt);
        req.body.password = hashedPaswword;
        const newuser = new User(req.body);
        await newuser.save();
        res
            .status(200)
            .send({ message: "Felhasználó sikeresen létrehozva", success: true });
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({ message: "Felhasználó létrehozzása sikertelen", success: false, error });
    }
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "Még nem létezik ilyen e-mail címmel felhasználó", success: false });
        }
        const IsMatch = await bcrypt.compare(req.body.password, user.password);
        if (!IsMatch) {
            return res
                .status(200)
                .send({ message: "A jelszó nem megfelelő", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            res
                .status(200)
                .send({ message: "Sikeres belépés", success: true, data: token })
        }
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({ message: "Hiba a bejelentkezésnél", success: false, error });
    }
});

module.exports = router;