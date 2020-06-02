const express = require('express');
const mongoose = require('mongoose');
const Configuration = mongoose.model('Configuration');
const reqAuth = require('../middlewares/reqAuth');
const reqRole = require('../middlewares/reqRole');

const router = express.Router();

router.use(reqAuth);
router.use(reqRole);

router.get('/config', async (req, res) => {
    try {
        const config = await Configuration.findOne();
        res.send({config});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/config', async (req, res) => {
    try {
        const count = await Configuration.countDocuments({});
        if (count > 0) { //singleton
            return res.status(422).send('相關文件已存在');
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }

    try {
        const config = new Configuration();
        await config.save();

        res.send({config});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/config/sermon_youtube_id', async (req, res) => {
    const {id} = req.body;

    try {
        const config = await Configuration.findOneAndUpdate({}, {sermonYoutubeId: id}, {new: true});
        res.send({config});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/config/ch_live_stream', async (req, res) => {
    const {url} = req.body;

    try {
        const config = await Configuration.findOneAndUpdate({}, {chLiveStreamUrl: url}, {new: true});
        res.send({config});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/config/en_live_stream', async (req, res) => {
    const {url} = req.body;

    try {
        const config = await Configuration.findOneAndUpdate({}, {enLiveStreamUrl: url}, {new: true});
        res.send({config});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/config/weekly_brochure', async (req, res) => {
    const {url} = req.body;

    try {
        const config = await Configuration.findOneAndUpdate({}, {weeklyBrochureUrl: url}, {new: true});
        res.send({config});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

module.exports = router;