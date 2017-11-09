/*
 * tracker
 * MIT Licensed
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger');

const URL = process.env.APP_URL || 'http://localhost';
const PORT = process.env.PORT || 8081;
const app = express();

const errorLogMiddleware = morgan('dev', {
    skip: function(req, res) {
        return res.statusCode >=400;
    },
    stream: process.stderr,
});

const outLogMiddleware = morgan('combined', {
    skip: function(req, res) {
        return res.statusCode < 400;
    },
    stream: process.stdout,
});

app.use(errorLogMiddleware);
app.use(outLogMiddleware);

app.use(cors());
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.json({msg: 'Hello World'});
});

app.listen(PORT, function() {
    let uri = URL + ( PORT ? (':' + PORT) :'');
    logger.info('> Listening at ' + uri + '\n');
});
