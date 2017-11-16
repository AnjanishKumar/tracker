'use strict';

const authController = require('./../modules/auth/authController');
const authPolicy = require('./../modules/auth/authPolicy');
/**
 * Module dependency
 * @public
 */
const express = require('express');


module.exports = function(app) {
    // Get an instance of router
    let authRouter = new express.Router;

    authRouter.post('/register', authPolicy.register, authController.register);

    authRouter.post('/login', authPolicy.login, authController.login);

    authRouter.get('/google', authController.googleLogin);

    authRouter.get('/google/callback', authController.googleLoginCallback);

    authRouter.get('/facebook', authController.facebookLogin);

    authRouter.get('/facebook/callback', authController.facebookLoginCallback);

    authRouter.post('/forgetpassword', authPolicy.forgetPassword,
        authController.forgetPassword);

    authRouter.post('/resetpassword', authPolicy.resetPassword,
        authController.resetPassword);

    // Add router to app
    app.use('/auth', authRouter);
};
