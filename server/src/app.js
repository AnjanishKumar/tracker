/*
 * tracker
 * MIT Licensed
 */

/**
 * Module dependencies
 * @private
 */
const config = require('./config');
const logger = require('./logger');
const db = require('./db')();
const app = require('./server')(db);

require('./init');
require('./libs/gracefulExit');

app.listen(config.app.port, function() {
    logger.info();
    logger.info(config.app.name + ' v' + config.app.version +
        ' application started!');
    logger.info('----------------------------------------------');
    logger.info('Environment:\t' + config.app.env);
    logger.info('Port:\t\t' + config.app.port);
    logger.info('Database:\t\t' + config.db.uri);
    logger.info('Redis:\t\t' +
        (config.redis.enabled ? config.redis.uri : 'Disabled'));
    logger.info('');
});
