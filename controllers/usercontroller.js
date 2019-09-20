var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/createuser', function(req, res){

    var username = req.body.user.username;
    var pass = req.body.user.password;
    var email = req.body.user.email;
    var firstname = req.body.user.firstname;
    var lastname = req.body.user.lastname;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10),
        email: email,
        firstname: firstname,
        lastname: lastname
    }).then(
        function createSuccess(user) {

            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res) {
    
    User.findOne( {where: { username: req.body.user.username } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if(matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "failed attempt"})
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function (err) {
            res.status(501).send({ error: "attempt unsuccessful" });
        }
    );
});

module.exports = router;