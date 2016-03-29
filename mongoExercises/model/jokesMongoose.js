var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JokeSchema = new Schema({
    joke: String,
    type: Array,
    reference: [{
        body: String,
        text: String
    }],
    lastEdited: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Joke', JokeSchema);