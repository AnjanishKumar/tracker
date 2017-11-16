/*
 * tracker
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies
 * @private
 */
const logger = require('./logger');
const config = require('./config');

const mongoose = require('mongoose');
const Promise = require('bluebird');
/**
 * Module variables
 * @private
 */


let mongoAfterConnect = function(err) {
    if (err) {
        // TODO: send notification to admin that database connection is failing
        // add provision to continuously retry to establish database connection
        logger.error('Could not connect to MongoDB!');
        return logger.error(err);
    }

    mongoose.set('debug', config.isDevMode());
};

let onConnectionError = function(err) {
    if (err.message.code === 'ETIMEDOUT') {
        logger.warn('Mongo connection timeout!', err);
        setTimeout(() => {
            mongoose.connect(config.db.uri, config.db.options);
        }, 1000);
        return;
    }

    logger.error('Could not connect to MongoDB!');
    return logger.error(err);
};

let onConnectionOpen = function() {
    logger.info('Mongo DB connected.');
    logger.info();
};

let onConnected = function() {
    logger.info('Mongoose default connection open to ' + config.db.uri);
};

let onDisconnected = function() {
    logger.warn('Mongoose default connection disconnected');
};


/**
 * Module exports
 * @public
 */

module.exports = function() {
    let db;

    logger.info();

    // User native promises
    mongoose.Promise = Promise;

    if (mongoose.connection.readyState !== 1) {
        logger.info('Connecting to Mongo ' + config.db.uri + '...');
        db = mongoose.connect(config.db.uri, config.db.options
            , mongoAfterConnect);

        mongoose.connection.once('open', onConnectionOpen);
        mongoose.connection.on('connected', onConnected);
        mongoose.connection.on('disconnected', onDisconnected);
        mongoose.connection.on('error', onConnectionError);
    } else {
        logger.info('Mongo already connected.');
        db = mongoose;
    }

    return db;
};
