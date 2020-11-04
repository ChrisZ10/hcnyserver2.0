const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
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
    },
    users: {
      	type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],
		default: []
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Prayer', prayerSchema);