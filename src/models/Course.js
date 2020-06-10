const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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
    teacher: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    zoomId: {
        type: String,
        default: ''
    },
    registerUrl: {
        type: String,
        default: ''
    },
    attachment: {
        type: [{
            title: String,
            url: {
                type: String,
                default: ''
            }
        }],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Course', courseSchema);