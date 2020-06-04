const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const reqAuth = require('../middlewares/reqAuth');

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

module.exports = router;