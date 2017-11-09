/*
 * tracker
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 * @private
 */

const Winston = require('winston');

/**
 * Module variables
 * @private
 */

const level = process.env.LOG_LEVEL || 'debug';

/**
 * Initialize the application logger using given config
 */
const logger = new Winston.Logger({
    transports: [
        new Winston.transports.Console({
            level: level,
            timestamp: function() {
                return (new Date()).toISOString();
            },
        }),
    ],
 });

/**
 * Module exports
 * @public
 */

module.exports = logger;
