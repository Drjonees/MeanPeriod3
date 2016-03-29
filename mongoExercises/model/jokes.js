var connect = require("../db/db");
var ObjectId = require('mongodb').ObjectID;

function _allJokes(callback) {
    var db = connect.get();
    db.collection("jokes").find({}).toArray(function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _findJoke(id, callback) {
    var db = connect.get();
    db.collection("jokes").find({
        _id: id
    }).toArray(function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

function _editJoke(jokeToEdit, callback) {
    var db = connect.get();
    db.collection("jokes").updateOne({
        "_id": new ObjectId(jokeToEdit._id)
    }, {
        $currentDate: {
            lastEdited: true
        },
        $set: {
            joke: jokeToEdit.joke,
            type: jokeToEdit.type
        }
    }, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}




function _addJoke(jokeToAdd, callback) {
    var db = connect.get();
    db.collection("jokes").insert(jokeToAdd, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });

}

function _deleteJoke(id, callback) {
    var db = connect.get();
    db.collection("jokes").remove({
        "_id": new ObjectId(id)
    }, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    })
}


function _randomJoke(callback) {
    _allJokes(function (err, data) {
        if (err) {
            callback(err);
        } else {
            var random = Math.floor(Math.random() * data.length);
            callback(null, data[random]);
        }
    });
}



exports.allJokes = _allJokes;
exports.findJoke = _findJoke;
exports.addJoke = _addJoke;
exports.editJoke = _editJoke;
exports.deleteJoke = _deleteJoke;
exports.randomJoke = _randomJoke;