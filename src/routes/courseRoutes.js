const express = require('express');
const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const reqAuth = require('../middlewares/reqAuth');
const reqRole = require('../middlewares/reqRole');

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

router.post('/api/v1/course', reqRole, async (req, res) => {
    const {title, slug, description, teacher, time, zoomId, registerUrl, attachment} = req.body;
    
    try {
        const course = new Course({title, slug, description, teacher, time, zoomId, registerUrl, attachment});
        await course.save();
        res.send(course);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;