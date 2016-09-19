/**
 * Created by cshlovjah on 18.09.16.
 */
var log = require('../../app/libs/log')(module);
var User = require('../models/user');


exports.findUserAll = function (req, res) {
    log.info("Retrive's values from user")
    var query = User.find(function (err, users) {
        console.log(users)
        res.send(users);
    });
}

exports.findUserById = function (req, res) {
    log.info("Retrive's values from user id ");
    var _id = req.params.id;
    var query = User.find({ '_id': _id },function (err, users) {
        console.log(users);
        res.send(users);
    });
}

exports.addUser = function (req, res) {
    //console.log(req);
    var user = req.body;

    log.info('Adding user: ' + JSON.stringify(user));
    res.send({"status": "ok"});
}

exports.updateUser = function (req, res) {
    console.log(req);
    res.send({"status": "ok"});
}
exports.deleteUser = function (req, res) {
    console.log(req);
    res.send({"status": "ok"});
}


exports.updatePropertyUser = function (req, res) {
    var id = req.params.id;
    var account = {};
    _.each(req.body, function (num, key) {
        if (req.body[key] != undefined) {
            account[key] = req.body[key]
        }

    });

    if (account.password != undefined) {
        if (account.password != account.confirmPassword) {
            res.json({message: 'Пароли не совпадают!'});
        } else {
            console.log("Сохраняем");

            Account.findById({_id: id}, function (err, p) {
                if (!p) {
                    log.info("Could not load Document");

                    //return next(new Error('Could not load Document'));
                    res.json({'error': {'error': err, 'message': 'Document not found'}});
                }
                else {

                    p.setPassword(account.password, function (err, user) {
                        if (err) {
                            log.info(err);
                            res.json({'error': {'error': err, 'message': 'Password not set'}});
                        } else {
                            console.log(user.salt);
                            console.log(user.status);
                            var conditions = {_id: new ObjectID(id)}
                                , update = {
                                updateOwner: req.user.username,
                                updateDate: utilz.nowDate(),
                                hash: user.hash,
                                salt: user.salt
                            };

                            Account.update(conditions, update, function (err, place) {

                                if (err) {
                                    log.info(err);
                                }
                                res.json(place)
                            });
                        }
                    });
                }
            });
        }
    } else {
        delete account.password;
        delete account.confirmPassword;

        account.updateDate = utilz.nowDate(),
            account.updateOwner = req.user.username,
            log.info("Пользователь: " + JSON.stringify(account));
        var idString = new ObjectID(id);

        var collection = db.get().collection('accounts');
        collection.update({'_id': idString}, {
            $set: account
        }, function (err, result) {
            if (err) {
                log.info(err);
                log.info(result);
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
}