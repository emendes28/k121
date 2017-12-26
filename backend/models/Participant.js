const mongoose = require('mongoose');

const ParticipantShema = new mongoose.Schema({
    name: String,
    email: String,
    friend: String
});

module.exports = mongoose.model('Participant',ParticipantShema);