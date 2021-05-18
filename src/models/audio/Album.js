const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        default: ''
    },
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        default: null
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Album', albumSchema);