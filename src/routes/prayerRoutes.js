const express = require('express');
const mongoose = require('mongoose');
const Prayer = mongoose.model('Prayer');

const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.get('/prayers', async (req, res) => {
    let prayers;
    try {
        prayers = await Prayer.find({}, null, {sort: {createdAt: -1}});
        res.send({prayers});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/prayer', [reqAuth, reqAdmin], async (req, res) => {
    const {title, content, url} = req.body;
    
    try {
        const prayer = new Prayer({title, content, url});
        await prayer.save();
        res.send({prayer});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/prayer', [reqAuth, reqAdmin], async (req, res) => {
    const {id, field, payload} = req.body;

    try {
        const prayer = await Prayer.findById(id);
        prayer[field] = payload;
        await prayer.save();
        res.send({prayer});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.delete('/api/v1/prayer', [reqAuth, reqAdmin], async (req, res) => {
    const {id} = req.body;

    try {
        const prayer = await Prayer.findByIdAndDelete(id);
        res.send({prayer});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;