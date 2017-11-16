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
const logger = require('./logger');

/**
 * Module dependencies
 * @public
 */
const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const helmet = require('helmet');

/**
 * Module variables
 * @private
 */

/**
 * initialize local variables
 * @param {Function} app Express instance
 */
function initLocalVariables(app) {
    logger.info('Initializing local variables');
    app.locals.app = config.app;

    app.set('port', config.app.port);
    app.set('etag', true);

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
       res.locals.url = req.protocol + '://' + req.header.host + req.url;
       return next();
    });
}

/**
 * Initialize response logging middleware
 * @param {Function} app Express instance
 */
function initMorganMiddleware(app) {
    logger.info('Initializing morgan response logging middleware');
    const errorLogMiddleware = morgan('dev', {
        skip: function(req, res) {
            return res.statusCode >=400;
        },
        stream: process.stderr,
    });

    const accessLogMiddleware = morgan('combined', {
        skip: function(req, res) {
            return res.statusCode < 400;
        },
        stream: process.stdout,
    });

    app.use(errorLogMiddleware);
    app.use(accessLogMiddleware);
}

/**
 * Initialize application middleware
 * @param {Function} app Express instance
 */
function initMiddleware(app) {
    logger.info('Initailizing application middleware');
    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cors());
    initMorganMiddleware(app);
}

/**
 * Use helmet to secure Express headers
 * @param {Function} app Express instance
 */
function initHelmetHeaders(app) {
    logger.info('Initializing helmet security headers');
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.frameguard());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hidePoweredBy());
}

/**
 * Initialize express application
 * @param {object} db mongoose database connection
 * @return {Function} Express instance
 */
const app = function(db) {
    // create an express app
    let expressApp = express();

    // Initialize local variables
    initLocalVariables(expressApp);

    // Initialize application middleware
    initMiddleware(expressApp);

    // Initialize helmet security headers
    initHelmetHeaders(expressApp);

    // Load routes
    require('./routes')(expressApp, db);

    return expressApp;
};

/**
 * Module exports
 * @public
 */

module.exports = app;
