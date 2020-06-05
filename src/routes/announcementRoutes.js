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

module.exports = router;