/**
 * Created by cshlovjah on 18.09.16.
 */

var moment = require('moment');
var async = require('async');



var currentDate = moment().toISOString();
console.log(currentDate);
async.waterfall([
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        console.log(currentDate);
        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        console.log(currentDate);
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'

    console.log(currentDate);
});
