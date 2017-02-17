var mongoose    = require('mongoose');
//campGround Schema
var roomSchema = new mongoose.Schema({
    name: String,
    status: String,
    users: Number,
    type: String,
});
module.exports = mongoose.model('room', roomSchema);