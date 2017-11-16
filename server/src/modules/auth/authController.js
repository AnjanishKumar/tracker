'use strict';

/**
 * Module dependyncy
 * @private
 */
const config = require('./../../config');
const logger = require('./../../logger');
const User = require('./../user/user');

const jwt = require('jsonwebtoken');
const promise = require('bluebird');
const bcrypt = promise.promisifyAll(require('bcrypt-nodejs'));

/**
 * sing user data using jsonwebtoken and return the token.
 *
 * @param {object} user data to sign
 * @return {string} JSON Web Token
 */
function jwtSignUser(user) {
  return jwt.sign(user, config.auth.jwt.secret, {
    expiresIn: config.auth.jwt.expiresIn,
  });
}

/**
 *
 * @param {string} password to be encrypted
 * @return {object} promise
 */
function hashPassword(password) {
  return bcrypt
    .genSaltAsync(config.auth.saltFactor)
    .then( (salt) => bcrypt.hashAsync(password, salt, null));
}

/**
 * Login a user
 * @param {Object} req
 * @param {Object} res
 * @return {object}
 */
async function login(req, res) {
  let {email, password} = req.body;

  try {
    let user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(403).send({
        error: {
          message: 'Incorrect Email or Password',
        },
      });
    }

    let isValidPassword = await bcrypt.compareAsync(password, user.password);
    if (!isValidPassword) {
       return res.status(403).send({
        error: {
          message: 'Incorrect Email or Password',
        },
      });
    }

    // successful login
    // Update user record with login time
    user.lastLogin = Date.now();
    user = await user.save();
    // TODO: filter the data that needs to be send to user.
    let jsonUser = user.toJSON();
    let payload = {id: user._id};
    let token = jwtSignUser(payload);

    return res.status(200).send({user: jsonUser, token: token});
  } catch (err) {
    logger.error(err);
    return res.status(400).json(err);
  }
}

/**
 * Register a new user
 * @param {Object} req
 * @param {Object} res
 */
async function register(req, res) {
    try {
        let user = new User(req.locals.data);
        user.password = await hashPassword(user.password);
        user = await user.save();
        res.json(user.toJSON());
    } catch (err) {
        // handle database error
        let result = {
            error: {
                message: 'ValidationError',
                details: [],
            },
        };

        if (err.name === 'ValidationError' && err.errors) {
            Object.keys(err.errors).forEach(function(key) {
                result.error.details.push({
                    key: key,
                    message: err.errors[key].message,
                });
            });
        } else {
          // TODO: return appropriate error code in case of other exception
            result = err;
            logger.error(err);
        }
        res.status(400).json(result);
    }
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
async function googleLogin(req, res) {
    res.json(req.url);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
async function googleLoginCallback(req, res) {
    res.json(req.url);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
async function facebookLogin(req, res) {
    res.json(req.url);
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
async function facebookLoginCallback(req, res) {
    res.json(req.url);
}

/**
 * send password reset email
 * @param {Object} req
 * @param {Object} res
 */
async function forgetPassword(req, res) {
    res.json(req.url);
}

/**
 * Reset user password
 * @param {Object} req
 * @param {Object} res
 */
async function resetPassword(req, res) {
    res.json(req.url);
}

/**
 * Module exports
 * @public
 */
module.exports = {
    login: login,
    register: register,

    googleLogin: googleLogin,
    googleLoginCallback: googleLoginCallback,

    facebookLogin: facebookLogin,
    facebookLoginCallback: facebookLoginCallback,

    forgetPassword: forgetPassword,
    resetPassword: resetPassword,
};
