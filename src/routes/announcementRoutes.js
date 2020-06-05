const express = require('express');
const mongoose = require('mongoose');
const Announcement = mongoose.model('Announcement');
const reqAuth = require('../middlewares/reqAuth');
const reqRole = require('../middlewares/reqRole');

const router = express.Router();

router.use(reqAuth);

router.get('/announcements', async (req, res) => {
    let announcements;
    try {
        req.query.keyword?
        announcements = await Announcement.find({
            $or: [
                {'title': {$regex: `${req.query.keyword}`}}, 
                {'content': {$regex: `${req.query.keyword}`}}
            ]
        }) :
        announcements = await Announcement.find({}, null, {sort: {createdAt: -1}});

        res.send({announcements});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/announcement', reqRole, async (req, res) => {
    const {title, content, url} = req.body;
    
    try {
        const announcement = new Announcement({title, content, url});
        await announcement.save();

        res.send({announcement});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/announcement', reqRole, async (req, res) => {
    const {id, field, payload} = req.body;

    try {
        const announcement = await Announcement.findById(id);
        announcement[field] = payload;
        await announcement.save();

        res.send({announcement});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.delete('/api/v1/announcement', reqRole, async (req, res) => {
    const {id} = req.body;

    try {
        const announcement = await Announcement.findByIdAndDelete(id);
        res.send({announcement});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;