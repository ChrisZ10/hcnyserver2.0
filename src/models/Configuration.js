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
    sermonImageTitle: {
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
    chineseSchedule: {
        type: {
            name: String,
            liveUrl: String
        }
    },
    englishSchedule: {
        type: {
            name: String,
            liveUrl: String
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

mongoose.model('Configuration', configurationSchema);