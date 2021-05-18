const express = require('express');
const mongoose = require('mongoose');

const Track = mongoose.model('Track');
const Album = mongoose.model('Album');
const Playlist = mongoose.model('Playlist');

const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.get('/tracks', async (req, res) => {
    const {slug, album_slug} = req.query;
    try {
        if (slug) {
            const track = await Track.findOne({slug});
            res.send(track);
            return;
        }

        if (album_slug) {
            const album = await Album.findOne({slug: album_slug});
            if (album) {
                const tracks = await Track.find({album: album._id});
                res.send(tracks);
            }
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }    
});

router.get('/playlists', async (req, res) => {
    try {
        const playlists = await Playlist.find();
        res.send(playlists);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get('/albums', async (req, res) => {
    const playlist_slug = req.query.playlist_slug;
    try {
        const playlist = await Playlist.findOne({slug: playlist_slug});
        if (playlist) {
            const albums = await Album.find({playlist: playlist._id});
            res.send(albums);
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/tracks', [reqAuth, reqAdmin], async (req, res) => {
    const {index, title, slug, uri, album_slug} = req.body;
    
    try {
        const album = await Album.findOne({slug: album_slug});
        let track;
        if (album) {
            track = new Track({index, title, slug, uri, album: album._id});
        } else {
            track = new Track({index, title, slug, uri});
        }
        await track.save();
        res.send(track);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.post('/api/v1/albums', [reqAuth, reqAdmin], async (req, res) => {
    const {index, title, slug, playlist_slug, tags} = req.body;
    
    try {
        const playlist = await Playlist.findOne({slug: playlist_slug});
        let album;
        if (playlist) {
            album = new Album({index, title, slug, playlist: playlist._id});
        } else {
            album = new Album({index, title, slug});
        }
        album.tags = [...tags];
        await album.save();
        res.send(album);
    } catch (err) {
        return res.status(500).send(err.message);
    } 
});

router.post('/api/v1/playlists', [reqAuth, reqAdmin], async (req, res) => {
    const {index, title, slug} = req.body;
    
    try {
        const playlist = new Playlist({index, title, slug});
        await playlist.save();
        res.send(playlist);
    } catch (err) {
        return res.status(500).send(err.message);
    } 
});

module.exports = router;