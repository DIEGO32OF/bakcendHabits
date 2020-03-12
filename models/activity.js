'use strict'
let mongoose = require('mongoose');

let activity = mongoose.Schema;
let activityModel = activity({

    active: Boolean,
    title: String,
    rules: String,
    type: String,
    points: Number,
    level: Number,
    extra: String,
    pillar: Number,
    duration: String

});

module.exports = mongoose.model('activities', activityModel);