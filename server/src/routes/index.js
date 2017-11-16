'use strict';

/**
 * Module dependency
 * @private
 */


/**
 * Module exports
 * @param {Function} app Express Instance
 * @param {Object} db mongoose db connection
 */
module.exports = function(app, db) {
    // Load routes
    app.get('/', function(req, res) {
        res.json({msg: 'Athena Online Education server'});
    });

    app.get('/health', function(req, res, next) {
       res.sendStatus(200);
    });

    // handle authentication routes
    require('./auth')(app);
};
