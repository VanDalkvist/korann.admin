// #region dependents

var winston = require('winston');
var path = require('path');

// #region initialization

// #region private functions

// todo: add exceptions log file
//winston.handleExceptions(
//    new winston.transports.File({
//        filename: '/exceptions.log' }
//    ));

function getLogger(module) {
    var localPath = module.filename.split(path.sep).slice(-2).join('/');
    return new winston.Logger(getConfig(localPath));
}

function getConfig(path) {
    return {
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                timestamp: true,
                label: path
            })
        ]
    };
}

// #region exports

exports.getLogger = getLogger;