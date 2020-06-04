const express = require('express');
const mongoose = require('mongoose');
const Configuration = mongoose.model('Configuration');
const reqAuth = require('../middlewares/reqAuth');
const reqRole = require('../middlewares/reqRole');

const router = express.Router();

router.use(reqAuth);

router.get('/config', async (req, res) => {
    try {
        const config = await Configuration.findOne();
        res.send({config});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/config', reqRole, async (req, res) => {
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

router.put('/api/v1/config', reqRole, async (req, res) => {
    const {field, payload} = req.body;

    try {
        const config = await Configuration.findOne();
        config[field] = payload;
        await config.save();

        res.send({config});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

module.exports = router;