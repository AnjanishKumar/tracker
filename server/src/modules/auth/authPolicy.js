'use strict';

/**
 * Module dependency
 * @public
 */
const Joi = require('joi');

/**
 * Validate registration request
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {object} response
 */
function registerRequest(req, res, next) {
    const schema = {
        email: Joi.string().email().required().label('Email'),

        password: Joi.string().min(6).max(32).required().label('Password'),

        confirmPassword: Joi.any().valid(Joi.ref('password')).required()
            .options({
                language: {
                    any: {
                        allowOnly: 'must match password',
                    },
                },
            })
            .label('Password Confirmation'),
    };

    const {error, value} = Joi.validate(req.body, schema,
        {
            abortEarly: false,
            stripUnknown: true,
        });

    if (error) {
        let result = {
            error: {
                message: 'ValidationError',
                details: [],
            },
        };

        error.details.forEach((detail) =>{
            result.error.details.push({
                'key': detail.context.key,
                'message': detail.message,
            });
        });
        return res.status(400).json(result);
    }

    req.locals = req.locals || Object.create(null);
    req.locals.data = value;
    next();
}

/**
 * Middleware for Validating login request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {object}
 */
function loginRequest(req, res, next) {
  const schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(1).required().label('Password'),
  };

  const {error} = Joi.validate(req.body, schema);

  if (error) {
     return res.status(400).json({
      error: {
        message: 'Invalid Email or Password!',
      },
    });
  }
  next();
}

// function googleLoginRequest(req, res, next) {
//     next();
// }
//
// function googleLoginCallbackRequest(req, res, next){
//     next();
// }
//
// function facebookLoginRequest(req, res, next) {
//     next();
// }
//
// function facebookLoginCallbackRequest(req, res, next) {
//     next();
// }

/**
 * Middleware for validating forget password request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function forgetPasswordRequest(req, res, next) {
    next();
}

/**
 * Middleware for validating reset password request
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function resetPasswordRequest(req, res, next) {
    next();
}

module.exports = {
    register: registerRequest,
    login: loginRequest,
    // googleLogin: googleLoginRequest,
    // googleLoginCallback: googleLoginCallbackRequest,
    // facebookLogin: facebookLoginRequest,
    // facebookLoginCallback: facebookLoginCallbackRequest,
    forgetPassword: forgetPasswordRequest,
    resetPassword: resetPasswordRequest,
};
