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
    duration: String,
    textarea: Boolean,
    lines:[{placeholder: String, value: String, uid: String}],
    opciones: [String],
    text: String,
    correct_answer : String

});

module.exports = mongoose.model('activities', activityModel);