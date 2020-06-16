const express = require('express');
const mongoose = require('mongoose');

const Track = mongoose.model('Track');
const Album = mongoose.model('Album');
const Collection = mongoose.model('Collection');

const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.use(reqAuth);

router.get('/tracks', async (req, res) => {
    const slug = req.query.slug;
    try {
        const track = await Track.findOne({slug});
        res.send({track});
    } catch (err) {
        return res.status(500).send(err.message);
    }    
});

router.post('/api/v1/tracks', reqAdmin, async (req, res) => {
    const {title, slug, uri, album_slug} = req.body;
    
    try {
        const album = await Album.findOne({slug: album_slug});
        let track;
        if (album) {
            track = new Track({title, slug, uri, album: album._id});
        } else {
            track = new Track({title, slug, uri});
        }
        await track.save();
        res.send({track});
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/albums', reqAdmin, async (req, res) => {
    const {title, slug, collection_slug} = req.body;
    
    try {
        const collection = await Collection.findOne({slug: collection_slug});
        let album;
        if (collection) {
            album = new Album({title, slug, collection: collection._id});
        } else {
            album = new Album({title, slug});
        }
        await album.save();
        res.send({album});
    } catch (err) {
        return res.status(500).send(err.message);
    } 
});

router.post('/api/v1/collections', reqAdmin, async (req, res) => {
    const {title, slug} = req.body;
    
    try {
        const collection = new Collection({title, slug});
        await collection.save();
        res.send({collection});
    } catch (err) {
        return res.status(500).send(err.message);
    } 
});

module.exports = router;