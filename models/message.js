var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    time: { type: Date, default: Date.now },
    msg: String
})

module.exports = mongoose.model('Message', MessageSchema)