const express = require('express');
const mongoose = require('mongoose');
const Document = mongoose.model('Document');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find({}, null, {sort: {createdAt: -1}});
        res.send({documents});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/document', reqAdmin, async (req, res) => {
    const {title, description, attachment} = req.body;
    
    try {
        const document = new Document({title, description, attachment});
        await document.save();
        res.send({document});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.put('/api/v1/document', reqAdmin, async (req, res) => {
    const {id, field, payload} = req.body;

    try {
        const document = await Document.findById(id);
        document[field] = payload;
        await document.save();
        res.send({document});
    } catch (err) {
        return res.status(422).send(err.message);
    }
});

router.delete('/api/v1/document', reqAdmin, async (req, res) => {
    const {id} = req.body;

    try {
        const document = await Document.findByIdAndDelete(id);
        res.send({document});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;