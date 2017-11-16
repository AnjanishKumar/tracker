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

// Print to console the full config in dev mode
if (!config.isProductionMode()) {
    logger.info('Loaded configuration:');
    logger.info(config);
    logger.info();
}
