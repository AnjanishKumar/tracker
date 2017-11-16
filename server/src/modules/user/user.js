'use strict';


/**
 * Module dependency
 * @public
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const timestamps = require('mongoose-timestamp');


let Schema = mongoose.Schema;

let userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
    },

    lastName: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        uniqueCaseInsensitive: true,
    },

    password: {
        type: String,
        required: true,
    },

    emailVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
      type: Date,
    },

});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, {message: '{PATH} already exits.'});

// Use timestamp plugin to adding createdAt and updatedAt field
userSchema.plugin(timestamps);

userSchema.statics.findUserBySlug = function(slug) {

};

/**
 * Module exports
 */
module.exports = mongoose.model('User', userSchema);
