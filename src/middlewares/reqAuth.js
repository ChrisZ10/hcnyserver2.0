const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const {key} = require('../routes/authRoutes');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).send('請登錄您的賬號');
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, key, async (err, decoded) => {
        if (err) {
            return res.status(401).send('請登錄您的賬號');
        }
        
        const {id} = decoded;
        try {
            const user = await User.findById(id);
            req.user = user;
            next();
        } catch (err) {
            return res.status(500).send(err.message);
        }        
    });
}