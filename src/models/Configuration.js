const mongoose = require('mongoose');

const configurationSchema = mongoose.Schema({
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
    chLiveStreamUrl: {
        type: String,
        default: ''
    },
    enLiveStreamUrl: {
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
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Configuration', configurationSchema);