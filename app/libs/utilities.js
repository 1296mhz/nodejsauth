/**
 * Created by cshlovjah on 18.09.16.
 */

var moment = require('moment');
var winston = require('winston');
//Вспомогательные утилиты
function Utilities() {
};

Utilities.prototype.nowLocalDate = function () {
    var currentDate = moment().format().split('+');
    return currentDate[0];
};

Utilities.prototype.nowISODate = function () {
    var currentDate = moment().toISOString();
    return currentDate;
};

Utilities.prototype.getLogger = function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path,
                timestamp: true,
            }),
            new winston.transports.File({
                level: 'info',
                filename: './logs/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            })
        ]
    });
}

module.exports = Utilities;