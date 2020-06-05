const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.use(reqAuth);

router.get('/user', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.send({user});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/user/lastname', async (req, res) => {
    const {lastname} = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.lastname = lastname;
        await user.save();
        res.send({user});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/user/firstname', async (req, res) => {
    const {firstname} = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.firstname = firstname;
        await user.save();
        res.send({user});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/user/group', async (req, res) => {
    const {group} = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.group = group;
        await user.save();
        res.send({user});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/user/role', reqAdmin, async (req, res) => {
    const {role} = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.role = role;
        await user.save();
        res.send({user});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

module.exports = router;