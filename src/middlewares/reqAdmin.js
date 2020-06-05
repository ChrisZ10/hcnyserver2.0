const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    const role = req.user.role;

    if (role !== 'admin') {
        return res.status(401).send('請登錄管理員賬號');
    }

    next();
}