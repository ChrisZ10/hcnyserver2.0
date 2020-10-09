const express = require('express');
const mongoose = require('mongoose');
const Announcement = mongoose.model('Announcement');
// const User = mongoose.model('User');

const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

// const {Expo} = require('expo-server-sdk');

const router = express.Router();

// let expo = new Expo();

router.get('/announcements', async (req, res) => {
    let announcements;
    try {
        req.query.keyword?
        announcements = await Announcement.find({
            $or: [
                {'title': {$regex: `${req.query.keyword}`}}, 
                {'content': {$regex: `${req.query.keyword}`}}
            ]
        }, null, {sort: {createdAt: -1}}) :
        announcements = await Announcement.find({}, null, {sort: {createdAt: -1}});

        res.send({announcements});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/announcement', [reqAuth, reqAdmin], async (req, res) => {
    const {title, content, url} = req.body;
    
    try {
        const announcement = new Announcement({title, content, url});
        await announcement.save();
        res.send({announcement});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.put('/api/v1/announcement', [reqAuth, reqAdmin], async (req, res) => {
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

router.delete('/api/v1/announcement', [reqAuth, reqAdmin], async (req, res) => {
    const {id} = req.body;

    try {
        const announcement = await Announcement.findByIdAndDelete(id);
        res.send({announcement});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;

/** 
* send notification 
*/

// let tokens = [];
// let messages = [];

// const sendNotification = async () => {
//     const users = await User.find({});
//     for (user of users) {
//         for (token of user.expoPushToken) {
//             tokens.push(token);
//         }
//     }
//     tokens = [...new Set(tokens)];

//     for (token of tokens) {
//         if (!Expo.isExpoPushToken(token)) {
//             console.error(`Push token ${token} is not a valid Expo push token`);
//             continue;
//         }
//         messages.push({
//             to: token,
//             sound: 'default',
//             body: 'This is a test notification',
//             data: {test: 'test'}
//         });
//     }

//     let chunks = expo.chunkPushNotifications(messages);
//     for (chunk of chunks) {
//         try {
//             let ticket = await expo.sendPushNotificationsAsync(chunk);
//             console.log(ticket);
//         } catch (err) {
//             console.log(err);
//         }
//     }
// };

// sendNotification();