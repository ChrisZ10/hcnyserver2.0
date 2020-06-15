const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Track', trackSchema);