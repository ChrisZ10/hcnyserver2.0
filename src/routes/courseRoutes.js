const express = require('express');
const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.use(reqAuth);

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({}, null, {sort: {createdAt: -1}});
        res.send({courses});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/course', reqAdmin, async (req, res) => {
    const {title, slug, description, teacher, time, zoomId, registerUrl, attachment} = req.body;
    
    try {
        const course = new Course({title, slug, description, teacher, time, zoomId, registerUrl, attachment});
        await course.save();
        res.send(course);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.put('/api/v1/course', reqAdmin, async (req, res) => {
    const {id, field, payload} = req.body;

    try {
        const course = await Course.findById(id);
        course[field] = payload;
        await course.save();
        res.send({course});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.delete('/api/v1/course', reqAdmin, async (req, res) => {
    const {id} = req.body;

    try {
        const course = await Course.findByIdAndDelete(id);
        res.send({course});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;