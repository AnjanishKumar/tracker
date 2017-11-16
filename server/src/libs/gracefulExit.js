/*
 * tracker
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 * @private
 */
const logger = require('./../logger');
const mongoose = require('mongoose');
const moment = require('moment');

/**
 * Module variables
 * @private
 */

let gracefulExit = function() {
    if (mongoose.connection.readyState === 0) {
        return process.exit(0);
    }

    mongoose.connection.close(function() {
        logger.info();
        logger.info(
            '----[ Server stopped at %s Uptime: %s ]----',
            moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
            moment.duration(process.uptime() * 1000).humanize()
        );

        return process.exit(0);
    });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
