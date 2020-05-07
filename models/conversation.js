'use strict'
let mongoose = require('mongoose');

let conversation = mongoose.Schema;
let conversationModel = conversation({

    advanced: String,
    basic: String,
    intermediate: String,
    change_habit: Boolean,
    n_conversation: String,
    points: Number,
    notification: {basic: String, intermediate: String, advanced: String},
    pillar: Number,
    next_basic:String,
    next_intermediate:String,
    next_advanced: String    

});

module.exports = mongoose.model('conversations', conversationModel);