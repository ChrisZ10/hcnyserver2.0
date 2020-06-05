const express = require('express');
const mongoose = require('mongoose');
const Note = mongoose.model('Note');
const reqAuth = require('../middlewares/reqAuth');

const router = express.Router();

router.use(reqAuth);

router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({userId: req.user._id}, null, {sort: {createdAt: -1}});
        res.send({notes});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/note', async (req, res) => {
    const {title, content, slug} = req.body;

    if (title === '') {
        return res.status(400).send('筆記標題不能為空');
    }

    let category = slug.split('-')[0];
    if (!(category === 'sermon' || category === 'meeting' || category === 'devotion')) {
        category = 'course';
    }

    try {
        const note = new Note({userId: req.user._id, slug, category, title, content});
        await note.save();
        res.send({note});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.put('/api/v1/note', async (req, res) => {
    const {title, content} = req.body;
    
    if (title === '') {
        return res.status(400).send('筆記標題不能為空');
    }

    try {
        const note = await Note.findOneAndUpdate({
            $and: [
                {title: title}, 
                {userId: req.user._id}
            ]}, {content: content}, {new: true}
        );
        res.send({note});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;