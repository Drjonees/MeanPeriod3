var express = require('express');
var router = express.Router();
//var jokes = require('../model/jokes');
var Jokes = require('../model/jokesMongoose');


router.get('/joke/random', function (req, res, next) {
    Jokes.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            var random = Math.floor(Math.random() * data.length);
            res.send(data[random]);
        }
    })
});

router.get('/jokes', function (req, res, next) {
    Jokes.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

router.put('/joke', function (req, res, next) {
    Jokes.findOne({
        _id: req.body._id
    }, function (err, joke) {

        for (var propertyName in req.body) {
            joke[propertyName] = req.body[propertyName];
        }

        joke.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.send(joke);
            }
        })
    });
});

router.post('/joke', function (req, res, next) {
    Jokes.create(req.body, function (err, joke) {
        if (err) {
            res.send(err);
        } else {
            res.send(joke);
        }
    })
});

router.delete('/joke/:_id', function (req, res, next) {
    Jokes.findOneAndRemove({
            _id: req.params._id
        },
        function (err, joke) {
            console.log(req.params._id);
            if (err) {
                res.send(err);
            } else {
                res.send(joke);
            }
        });
});


module.exports = router;