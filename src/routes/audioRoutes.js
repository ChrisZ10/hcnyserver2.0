const express = require('express');
const mongoose = require('mongoose');

const Track = mongoose.model('Track');
const Album = mongoose.model('Album');
const Playlist = mongoose.model('Playlist');

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
    const {title, slug, playlist_slug} = req.body;
    
    try {
        const playlist = await Playlist.findOne({slug: playlist_slug});
        let album;
        if (playlist) {
            album = new Album({title, slug, playlist: playlist._id});
        } else {
            album = new Album({title, slug});
        }
        await album.save();
        res.send({album});
    } catch (err) {
        return res.status(500).send(err.message);
    } 
});

router.post('/api/v1/playlists', reqAdmin, async (req, res) => {
    const {title, slug} = req.body;
    
    try {
        const playlist = new Playlist({title, slug});
        await playlist.save();
        res.send({playlist});
    } catch (err) {
        return res.status(500).send(err.message);
    } 
});

module.exports = router;