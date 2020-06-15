const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Album', albumSchema);