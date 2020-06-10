const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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

mongoose.model('Document', documentSchema);