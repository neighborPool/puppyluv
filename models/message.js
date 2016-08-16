var restful = require('node-restful');
var mongoose = restful.mongoose;

var MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    time: { type: Date, default: Date.now },
    msg: String
})

module.exports = restful.model('Message', MessageSchema)