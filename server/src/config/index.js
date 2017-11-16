/*
 * tracker
 * MIT Licensed
 */

const pkg = require('../../package.json');

const path = require('path');

// Load environment variable form .env at the root directory
require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env'),
});

module.exports = {
  isDevMode() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  },

  isProductionMode() {
      return process.env.NODE_ENV === 'production';
  },

  isTestMode() {
      return process.env.NODE_ENV === 'testing';
  },

  app: {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 8081,

      // You should set this to the root of
      url: process.env.APP_URL || 'http://localhost',

      timezone: process.env.APP_TIMEZONE || 'UTC',

  },

  db: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 8081,

      database: process.env.DB_DATABSE || 'database',
      username: process.env.DB_USERNAME || '',
      password: process.env.DB_PASSWORD || '',
      uri: process.env.DB_URI || 'mongodb://localhost/' + (process.env.DB_DATABSE || 'database') + '-dev',
      options: {
          user: process.env.DB_USERNAME || '',
          pass: process.env.DB_PASSWORD || '',
          useMongoClient: true,

          // Don't build indexes
          autoIndex: false,

          // Never stop trying to reconnect
          reconnectTries: Number.MAX_VALUE,

          // Reconnect every 500ms
          reconnectInterval: 500,

          // Maintain up to 10 socket connections
          poolSize: 10,

          // If not connected, return errors immediately rather than waiting
          // for reconnect
          bufferMaxEntries: 0,
          server: {
              socketOptions: {
                  keepAlive: 1,
              },
          },
      },
  },

  logging: {
      level: process.env.LOG_LEVEL || 'debug',
      console: {
          level: process.env.LOG_LEVEL || 'debug',
      },
  },

  mailer: {

  },

  redis: {

  },

  feature: {
    disableSignUp: !!process.env.DISABLE_SIGNUP || false,
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'secret',
      expiresIn: process.env.JWT_EXPIRES_IN || 60*60*24*30,
    },
    saltFactor: process.env.BCRYPT_SALT_FACTOR || 8,
  },

};
