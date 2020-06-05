const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    url: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Announcement', announcementSchema);