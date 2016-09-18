/**
 * Created by cshlovjah on 18.09.16.
 */
var express = require('express');
var router = express.Router();
var user = require('../api/controllers/user');

router.get('/', user.findUserAll);
router.get('/:id', user.findUserById);
router.post('/', user.addUser);
router.put('/:id', user.updateUser);
router.patch('/:id', user.updatePropertyUser);
router.delete('/:id', user.deleteUser);

module.exports = router;