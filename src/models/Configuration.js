const mongoose = require('mongoose');

const configurationSchema = mongoose.Schema({
    sermonTitle: {
        type: String,
        default: ''
    },
    sermonYoutubeId: {
        type: String,
        default: ''
    },
    youtubeChannelUrl: {
        type: String,
        default: ''
    },
    weeklyBrochureUrl: {
        type: String,
        default: ''
    },
    prayerRequestUrl: {
        type: String,
        default: ''
    },
    prayerMeetingZoomId: {
        type: [{
            name: String,
            zoomId: String
        }],
        default: []
    },
    schedule: {
        type: [{
            schedule: String,
            liveUrl: {
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

mongoose.model('Configuration', configurationSchema);