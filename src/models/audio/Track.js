const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    uri: {
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
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
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

mongoose.model('Track', trackSchema);