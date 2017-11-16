/*
 * tracker
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 * @private
 */
const config = require('./config');
const winston = require('winston');

/**
 * Module variables
 * @private
 */

let transports = [];


/**
 * Console transporter
 */
transports.push(new winston.transports.Console({
    level: config.logging.console.level,
    colorize: true,
    prettyPrint: true,
    handleExceptions: config.isDevMode(),
}));

/**
 * Initialize the application logger using given config
 */
let logger = new winston.Logger({
    level: config.logging.level,
    transports: transports,
    exitOnError: false,
});

/**
 * Module exports
 * @public
 */

module.exports = logger;
