const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'subscriber'
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    group: {
        type: String,
        default: ''
    },
    verified: {
        type: Boolean,
        default: false
    },
    expoPushToken: {
        type: [String],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) { 
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
      
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            return next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, same) => {
            if (err) {
                reject(err);
            } else if (!same) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

mongoose.model('User', userSchema);