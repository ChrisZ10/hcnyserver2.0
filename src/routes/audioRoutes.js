const express = require('express');
const mongoose = require('mongoose');

const Track = mongoose.model('Track');
const Album = mongoose.model('Album');
const Collection = mongoose.model('Collection');

const reqAuth = require('../middlewares/reqAuth');
const reqAdmin = require('../middlewares/reqAdmin');

const router = express.Router();

router.use(reqAuth);

module.exports = router;