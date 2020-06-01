const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

const SECRET_KEY = 'SGNueUAxMjM=';

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = new User({email, password});
        await user.save();

        const token = jwt.sign({id: user._id}, SECRET_KEY);
        res.send({token});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send('郵箱或密碼不能為空');
    }

    const user = await User.findOne({email});

    if (!user) {
        return res.status(400).send('此賬號不存在');
    }

    try {
        const match = await user.comparePassword(password);
        if (match) {
            const token = jwt.sign({id:user._id}, SECRET_KEY);
            res.send({token});
        } else {
            return res.status(400).send('密碼輸入錯誤');
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = {
    authRoutes: router,
    key: SECRET_KEY
};