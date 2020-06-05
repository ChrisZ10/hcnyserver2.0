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
        type: [String],
        default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Document', documentSchema);