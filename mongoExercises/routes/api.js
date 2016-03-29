var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');


router.get('/joke/random', function (req, res, next) {
    jokes.randomJoke(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.get('/jokes', function (req, res, next) {
    jokes.allJokes(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.put('/joke', function (req, res, next) {
    jokes.editJoke(req.body, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.post('/joke', function (req, res, next) {
    jokes.addJoke(req.body, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

router.delete('/joke/:_id', function (req, res, next) {
    jokes.deleteJoke(req.params._id, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

module.exports = router;